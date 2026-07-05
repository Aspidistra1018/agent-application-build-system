import { WorkflowMode } from '@coze-arch/bot-api/workflow_api';

/**
 *
 * @Param flowMode Whether it is a workflow in a broad sense, including the original Workflow and the Chatflow added by Coze 2.0
 * @returns
 */
export const isGeneralWorkflow = (flowMode: WorkflowMode) =>
  flowMode === WorkflowMode.Workflow || flowMode === WorkflowMode.ChatFlow;
