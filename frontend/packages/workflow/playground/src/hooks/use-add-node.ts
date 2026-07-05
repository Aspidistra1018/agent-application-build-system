import { useRef } from 'react';

import { set } from 'lodash-es';
import { useService } from '@flowgram-adapter/free-layout-editor';
import { StandardNodeType } from '@coze-workflow/base';

import { getWorkflowVersionByPluginId } from '@/utils';
import { type HandleAddNode } from '@/typing';
import { WorkflowEditService } from '@/services';
import { useNodeVersionService, useGlobalState } from '@/hooks';

import { useAddNodeModal } from './use-add-node-modal';

export interface AddNodeProps {
  x: number;
  y: number;
  isDrag: boolean;
}
export const useAddNode = () => {
  const prevAddNodeRef = useRef<{ x: number; y: number; isDrag: boolean }>({
    x: 0,
    y: 0,
    isDrag: false,
  });

  const updateAddNodePosition = (props: AddNodeProps) => {
    prevAddNodeRef.current = props;
  };

  const {
    openPlugin,
    openWorkflow,
    openImageflow,
    pluginModal,
    workflowModal,
    imageFlowModal,
  } = useAddNodeModal(prevAddNodeRef);

  const editService = useService<WorkflowEditService>(WorkflowEditService);
  const nodeVersionService = useNodeVersionService();
  const { spaceId } = useGlobalState();

  const handleAddSubWorkflow: HandleAddNode = async (
    item,
    coord = { x: 0, y: 0 },
    isDrag = false,
  ) => {
    const { nodeType, nodeJson, nodeVersionInfo } = item;
    if (nodeJson) {
      const { workflowId, pluginId } = nodeVersionInfo;
      const versionName = await getWorkflowVersionByPluginId({
        spaceId,
        pluginId,
      });
      versionName && set(nodeJson, 'data.inputs.workflowVersion', versionName);

      if (
        !(await nodeVersionService.addSubWorkflowCheck(workflowId, versionName))
      ) {
        return;
      }
      editService.addNode(
        nodeType,
        nodeJson,
        { clientX: coord?.x || 0, clientY: coord?.y || 0 },
        isDrag,
      );
      return;
    }
    // Record the historical location and open the subprocess pop-up window
    prevAddNodeRef.current = {
      x: coord.x,
      y: coord.y,
      isDrag,
    };
    openWorkflow();
    return;
  };
  const handleAddPlugin: HandleAddNode = async (
    item,
    coord = { x: 0, y: 0 },
    isDrag = false,
  ) => {
    const { nodeType, nodeJson, modalProps, nodeVersionInfo } = item;

    if (nodeJson) {
      const { pluginId, version } = nodeVersionInfo;
      if (!(await nodeVersionService.addApiCheck(pluginId, version))) {
        return;
      }
      // Node add panel, drag and drop to add specific plug-in node logic
      editService.addNode(
        nodeType,
        nodeJson,
        { clientX: coord?.x || 0, clientY: coord?.y || 0 },
        isDrag,
      );
      return;
    }
    // Record the historical location and open the plug-in pop-up window.
    prevAddNodeRef.current = {
      x: coord.x,
      y: coord.y,
      isDrag,
    };

    // Open the plug-in pop-up window to add a node
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openPlugin({ modalProps: modalProps as any });
  };

  const handleAddNode: HandleAddNode = (
    item,
    coord = { x: 0, y: 0 },
    isDrag = false,
  ) => {
    const { nodeType } = item;

    if (nodeType === StandardNodeType.Api) {
      // Node add panel, drag and drop to add specific child plugins
      return handleAddPlugin(item, coord, isDrag);
    }

    if (nodeType === StandardNodeType.SubWorkflow) {
      // Node add panel, drag and drop to add specific sub-processes
      return handleAddSubWorkflow(item, coord, isDrag);
    }

    // Node add panel, drag and drop to add ordinary nodes
    editService.addNode(
      item.nodeType,
      item.nodeJson,
      { clientX: coord?.x || 0, clientY: coord?.y || 0 },
      isDrag,
    );
  };

  return {
    handleAddNode,
    openPlugin,
    openWorkflow,
    openImageflow,
    updateAddNodePosition,
    modals: [workflowModal, pluginModal, imageFlowModal],
  };
};
