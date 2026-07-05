import { useShallow } from 'zustand/react/shallow';
import { useKnowledgeStore } from '@coze-data/knowledge-stores';
import { DocumentStatus } from '@coze-arch/bot-api/knowledge';

import { type ProgressMap } from '@/types';

/**
 * Hooks that handle basic information about documents
 */
export const useDocumentInfo = (progressMap: ProgressMap) => {
  const { documentList, dataSetDetail, curDocId } = useKnowledgeStore(
    useShallow(state => ({
      curDocId: state.curDocId,
      documentList: state.documentList,
      dataSetDetail: state.dataSetDetail,
    })),
  );

  // current document
  const curDoc = documentList?.find(i => i.document_id === curDocId);

  // processing state
  const isProcessing = curDoc?.status === DocumentStatus.Processing;
  const processFinished = curDocId
    ? progressMap[curDocId]?.status === DocumentStatus.Enable
    : false;

  // Dataset ID
  const datasetId = dataSetDetail?.dataset_id ?? '';

  return {
    curDoc,
    curDocId,
    isProcessing,
    processFinished,
    datasetId,
  };
};
