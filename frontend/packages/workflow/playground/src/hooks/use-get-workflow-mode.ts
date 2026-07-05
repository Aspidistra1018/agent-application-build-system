/**
 * This hooks are used to quickly determine the type of workflow
 */

import { useEntity } from '@flowgram-adapter/free-layout-editor';
import { WorkflowMode } from '@coze-workflow/base/api';

import { WorkflowGlobalStateEntity } from '../typing';

export const useGetWorkflowMode = () => {
  const globalState = useEntity<WorkflowGlobalStateEntity>(
    WorkflowGlobalStateEntity,
  );

  const isImageFlow = globalState.flowMode === WorkflowMode.Imageflow;
  const isSceneFlow = globalState.flowMode === WorkflowMode.SceneFlow;
  const isChatflow = globalState.flowMode === WorkflowMode.ChatFlow;
  // const isSceneFlow = true;

  return {
    isImageFlow,
    isSceneFlow,
    isChatflow,
  };
};
