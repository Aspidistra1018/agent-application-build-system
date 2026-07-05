import { useConfigEntity } from '@flowgram-adapter/free-layout-editor';

import { WorkflowGlobalStateEntity } from '../entities';

/** Get global state */
export const useGlobalState = (
  listenChange = true,
): WorkflowGlobalStateEntity => {
  const globalState = useConfigEntity<WorkflowGlobalStateEntity>(
    WorkflowGlobalStateEntity,
    listenChange,
  );
  return globalState;
};
