import { type UnitType } from '@coze-data/knowledge-resource-processor-core';
import {
  useKnowledgeListModal as useKnowledgeListModalBase,
  type UseKnowledgeListModalParams,
} from '@coze-data/knowledge-modal-base';

import { useCreateKnowledgeModalV2 } from '../../../create-knowledge-modal-v2/scenes/base';

// Directly use the original parameter types without creating a new interface
export const useKnowledgeListModal = (
  params: Omit<UseKnowledgeListModalParams, 'createKnowledgeModal'>,
) => {
  const { onClickAddKnowledge, beforeCreate, projectID } = params;

  // A modal for creating a knowledge base
  const createKnowledgeModal = useCreateKnowledgeModalV2({
    projectID,
    onFinish: (datasetId: string, type: UnitType, shouldUpload: boolean) => {
      onClickAddKnowledge?.(datasetId, type, shouldUpload);
      createKnowledgeModal.close();
    },
    beforeCreate,
  });

  // Pass createKnowledgeModal to the base component
  return useKnowledgeListModalBase({
    ...params,
    createKnowledgeModal,
  });
};
