import { WorkflowNodeRefVariablesData } from '@coze-workflow/variable';
import { type IFormSchema } from '@coze-workflow/test-run-next';

import type { WorkflowNodeEntity } from '../types';
import { generateEnvToRelatedContextProperties } from './generate-env-to-related-context-properties';

interface GenerateFormRelatedFieldOptions {
  node: WorkflowNodeEntity;
  isChatflow: boolean;
  isInProject: boolean;
  spaceId: string;
  workflowId: string;
}

export const generateFormRelatedField = async ({
  node,
  isChatflow,
  isInProject,
  spaceId,
  workflowId,
}: GenerateFormRelatedFieldOptions) => {
  const registry = node.getNodeRegistry();

  let field: IFormSchema | null = null;
  if (registry?.meta?.test?.generateRelatedContext) {
    field = await registry.meta.test.generateRelatedContext(node, {
      isChatflow,
      isInProject,
      spaceId,
      workflowId,
    });
  }
  /** If the custom logic determines that the environment does not need to be selected, it is also necessary to determine the variable reference */
  if (
    !field &&
    !isInProject &&
    node.getData(WorkflowNodeRefVariablesData).hasGlobalRef
  ) {
    field = generateEnvToRelatedContextProperties({ isNeedBot: true });
  }

  return field;
};
