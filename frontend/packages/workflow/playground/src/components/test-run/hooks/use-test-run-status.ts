import { useMemo, useState } from 'react';

import { WorkflowExecStatus } from '@coze-workflow/base';
import { useEntity } from '@flowgram-adapter/free-layout-editor';

import {
  WorkflowGlobalStateEntity,
  WorkflowTestFormStateEntity,
} from '../../../entities';

const useTestRunStatus = (nodeId: string) => {
  const globalState = useEntity<WorkflowGlobalStateEntity>(
    WorkflowGlobalStateEntity,
  );
  const testFormState = useEntity<WorkflowTestFormStateEntity>(
    WorkflowTestFormStateEntity,
  );
  const [loading, setLoading] = useState(false);
  const {
    config: { saving, saveLoading, viewStatus },
  } = globalState;
  const {
    config: { frozen },
  } = testFormState;

  const disabled = useMemo(
    () => !loading && (!!frozen || saving),
    [loading, frozen, saving],
  );

  /** Is it a lock triggered by this node? */
  const isMineRunning = useMemo(
    () => frozen && frozen === nodeId,
    [frozen, nodeId],
  );

  const running = useMemo(
    () => viewStatus === WorkflowExecStatus.EXECUTING,
    [viewStatus],
  );

  return {
    loading,
    setLoading,
    saving,
    saveLoading,
    frozen,
    disabled,
    isMineRunning,
    running,
  };
};

export { useTestRunStatus };
