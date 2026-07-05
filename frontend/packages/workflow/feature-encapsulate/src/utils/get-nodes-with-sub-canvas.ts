import { uniq } from 'lodash-es';
import {
  type WorkflowNodeRegistry,
  type FlowNodeEntity,
} from '@flowgram-adapter/free-layout-editor';

/**
 * Get a list of nodes with sub-nodes
 * @param nodes
 * @returns
 */
export const getNodesWithSubCanvas = (nodes: FlowNodeEntity[]) =>
  uniq(
    nodes
      .map(node => {
        const registry = node.getNodeRegistry() as WorkflowNodeRegistry;
        const subCanvas = registry?.meta?.subCanvas;

        return [
          node,
          // All sub-nodes corresponding to the sub-canvas
          ...(subCanvas?.(node)?.canvasNode?.allCollapsedChildren || []),
        ];
      })
      .flat(),
  );
