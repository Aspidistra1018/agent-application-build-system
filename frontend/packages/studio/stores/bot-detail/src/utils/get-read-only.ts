import { usePageRuntimeStore } from '../store/page-runtime';
import { useCollaborationStore, EditLockStatus } from '../store/collaboration';

/**
 * Non-responsive; reference useBotDetailIsReadonly method
 */
export function getBotDetailIsReadonly() {
  const pageRuntime = usePageRuntimeStore.getState();
  const collaboration = useCollaborationStore.getState();
  return getBotDetailIsReadonlyByState({
    editable: pageRuntime.editable,
    isPreview: pageRuntime.isPreview,
    editLockStatus: collaboration.editLockStatus,
  });
}

export const getBotDetailIsReadonlyByState = ({
  editable,
  isPreview,
  editLockStatus,
}: {
  editable: boolean;
  isPreview: boolean;
  editLockStatus?: EditLockStatus;
}) => !editable || isPreview || editLockStatus === EditLockStatus.Lose;
