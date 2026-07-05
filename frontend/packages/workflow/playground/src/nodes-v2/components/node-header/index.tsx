/**
 * Components migrated from packages/workflow/playground/src/form-extensions/setters/node-header
 * Only the interface adaptation of the new version of the node engine has been done.
 */
import React from 'react';

import { type FieldError } from '@flowgram-adapter/free-layout-editor';

import { useReadonly } from '@/nodes-v2/hooks/use-readonly';
import { type ComponentProps } from '@/nodes-v2/components/types';
import { useGlobalState, useNodeRenderScene } from '@/hooks';
import { NodeHeader as NodeHeaderComponent } from '@/form-extensions/components/node-header';

import { withValidation } from '../validation';

export interface NodeHeaderValue {
  title: string;
  icon: string;
  subTitle: string;
  description: string;
}
export type NodeHeaderProps = ComponentProps<NodeHeaderValue> & {
  errors?: FieldError[];
  readonly?: boolean;
  hideTest?: boolean;
  batchModePath?: string;
  outputsPath?: string;
  extraOperation?: React.ReactNode;
  showTrigger?: boolean;
  triggerIsOpen?: boolean;
  nodeDisabled?: boolean;
  readonlyAllowDeleteOperation?: boolean;
};

export const NodeHeader = withValidation<NodeHeaderProps>(
  ({
    value,
    onChange,
    onBlur,
    readonly = false,
    hideTest = false,
    extraOperation,
    showTrigger = false,
    triggerIsOpen = false,
    nodeDisabled,
    readonlyAllowDeleteOperation,
  }: NodeHeaderProps) => {
    const { title, icon, subTitle, description } = value || {};
    const workflowReadonly = useReadonly();
    const { projectId, projectCommitVersion } = useGlobalState();
    const { isNodeSideSheet } = useNodeRenderScene();

    return (
      <NodeHeaderComponent
        title={title}
        subTitle={subTitle}
        // If it is the new version of coze2.0 node rendering, hide the description.
        description={description}
        logo={icon}
        onTitleChange={newTitle => {
          onChange({ ...value, title: newTitle });
          onBlur?.();
        }}
        onDescriptionChange={desc => {
          onChange({ ...value, description: desc });
        }}
        readonly={readonly || workflowReadonly}
        readonlyAllowDeleteOperation={
          workflowReadonly ? false : readonlyAllowDeleteOperation
        }
        hideTest={
          hideTest || IS_BOT_OP || !!(projectId && projectCommitVersion)
        }
        showTrigger={showTrigger}
        triggerIsOpen={triggerIsOpen}
        extraOperation={extraOperation}
        showCloseButton={isNodeSideSheet}
        nodeDisabled={nodeDisabled}
      />
    );
  },
);
