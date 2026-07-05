import { I18n } from '@coze-arch/i18n';
import { Modal } from '@coze-arch/bot-semi';
import { DatabaseDetailComponent } from '@coze-data/database-v2';

import { useGlobalState } from '@/hooks';

import { useWorkflowDetailModalStore } from './use-workflow-detail-modal-store';

import styles from './database-detail-model.module.less';

/**
 * database details pop-up
 */
export function DatabaseDetailModal() {
  const {
    databaseID,
    isVisible,
    close,
    isAddedInWorkflow,
    onChangeDatabaseToWorkflow,
    tab = 'structure',
  } = useWorkflowDetailModalStore();

  const { projectCommitVersion } = useGlobalState();

  if (!databaseID) {
    return null;
  }

  const addRemoveButtonText = isAddedInWorkflow
    ? // This key is named incorrectly. It should be removed from the workflow product. The product has been entered. Continue to use the wrong key here.
      I18n.t('workflow_remove_to_workflow')
    : I18n.t('workflow_add_to_workflow');

  return (
    <Modal
      fullScreen
      visible={isVisible}
      footer={null}
      closable={false}
      className={styles.editDatabaseModal}
      modalContentClass="p-0"
    >
      <DatabaseDetailComponent
        version={projectCommitVersion}
        databaseId={databaseID}
        enterFrom="workflow"
        initialTab={tab}
        onClose={() => close()}
        addRemoveButtonText={addRemoveButtonText}
        onClickAddRemoveButton={() => {
          if (isAddedInWorkflow) {
            onChangeDatabaseToWorkflow();
          } else {
            onChangeDatabaseToWorkflow(databaseID);
          }

          close();
        }}
      />
    </Modal>
  );
}
