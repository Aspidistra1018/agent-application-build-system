import { useService } from '@flowgram-adapter/free-layout-editor';

import { WorkflowModelsService } from '@/services';

import { useModelType } from '../hooks/use-model-type';

/**
 * Is the judgment model a supporting skill?
 */
export function useModelSkillDisabled() {
  const modelType = useModelType();

  const modelsService = useService(WorkflowModelsService);
  return !(modelType && modelsService.isFunctionCallModel(modelType));
}
