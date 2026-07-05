import { useRef } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { useKnowledgeStore } from '@coze-data/knowledge-stores';
import { I18n } from '@coze-arch/i18n';
import { Toast } from '@coze-arch/coze-design';
import { UpdateType } from '@coze-arch/bot-api/knowledge';

import { useUpdateDocument } from '@/service/document';

export const useDocumentManagement = (props?: {
  reloadDataset?: () => void;
}) => {
  const { curDocId, setCurDocId, documentList } = useKnowledgeStore(
    useShallow(state => ({
      curDocId: state.curDocId,
      setCurDocId: state.setCurDocId,
      documentList: state.documentList,
    })),
  );

  // Cache the previous document ID for rollback after load failure
  const prevDocIdRef = useRef<string | null>(null);

  // Update document name
  const { run: updateDocument } = useUpdateDocument({
    onSuccess: () => {
      Toast.success(I18n.t('Update_success'));
      props?.reloadDataset?.();
    },
  });

  // Select document
  const handleSelectDocument = (docId: string) => {
    prevDocIdRef.current = curDocId || null;
    setCurDocId(docId);
  };

  // rename document
  const handleRenameDocument = (docId: string, newName: string) => {
    updateDocument({
      document_id: docId,
      document_name: newName,
    });
  };

  // Update document frequency
  const handleUpdateDocumentFrequency = (
    docId: string,
    formData: { updateInterval?: number; updateType?: UpdateType },
  ) => {
    if (!documentList) {
      return;
    }

    const updatedDocList = documentList.map(doc => {
      if (doc.document_id === docId) {
        return {
          ...doc,
          update_interval: formData?.updateInterval,
          update_type: formData.updateInterval
            ? UpdateType.Cover
            : UpdateType.NoUpdate,
        };
      }
      return doc;
    });

    return updatedDocList;
  };

  // Rollback document selection
  const rollbackDocumentSelection = () => {
    if (prevDocIdRef.current) {
      setCurDocId(prevDocIdRef.current);
    }
  };

  return {
    prevDocIdRef,
    updateDocument,
    handleSelectDocument,
    handleRenameDocument,
    handleUpdateDocumentFrequency,
    rollbackDocumentSelection,
  };
};
