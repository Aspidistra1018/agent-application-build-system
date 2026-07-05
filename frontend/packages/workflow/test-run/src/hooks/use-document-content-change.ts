import { useEffect } from 'react';

import { useService } from '@flowgram-adapter/free-layout-editor';
import {
  WorkflowDocument,
  type WorkflowContentChangeEvent,
  type WorkflowContentChangeType,
} from '@flowgram-adapter/free-layout-editor';

type Listener = (e: WorkflowContentChangeEvent) => void;

/**
 * A hook to monitor changes in document content
 */
export const useDocumentContentChange = (
  /** Listener */
  listener: Listener,
  /** Listen type, listen to all by default */
  listenType?: WorkflowContentChangeType,
) => {
  const workflowDocument = useService<WorkflowDocument>(WorkflowDocument);

  useEffect(() => {
    const disposable = workflowDocument.onContentChange(e => {
      if (!listenType || listenType === e.type) {
        listener(e);
      }
    });

    return () => disposable.dispose();
  }, [workflowDocument, listener, listenType]);
};
