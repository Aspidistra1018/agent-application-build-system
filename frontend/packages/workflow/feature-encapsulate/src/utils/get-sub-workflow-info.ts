import { FlowNodeFormData } from '@flowgram-adapter/free-layout-editor';
import { type WorkflowNodeEntity } from '@flowgram-adapter/free-layout-editor';

interface SubWorkflowInfo {
  spaceId: string;
  workflowId: string;
  workflowVersion: string;
}

/**
 * Get subprocess information
 * @param node child process node
 * @returns spaceId and workflowId
 */
export function getSubWorkflowInfo(
  node: WorkflowNodeEntity,
): SubWorkflowInfo | undefined {
  const formData = node.getData<FlowNodeFormData>(FlowNodeFormData);
  const formItem = formData?.formModel.getFormItemValueByPath('/inputs');

  if (!formItem) {
    return;
  }

  return {
    spaceId: formItem.spaceId,
    workflowId: formItem.workflowId,
    workflowVersion: formItem.workflowVersion,
  };
}
