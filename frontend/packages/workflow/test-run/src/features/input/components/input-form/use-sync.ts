import { useEffect } from 'react';

import { useMemoizedFn } from 'ahooks';
import { type NodeEvent } from '@coze-arch/bot-api/workflow_api';

import { useTestRunService } from '../../../../hooks';

export const useSync = (inputEvent: NodeEvent | undefined) => {
  const testRunService = useTestRunService();

  const eventSync = useMemoizedFn((event: NodeEvent | undefined) => {
    // end
    if (!event) {
      testRunService.continueTestRun();
      return;
    }
    testRunService.pauseTestRun();
  });

  useEffect(() => {
    eventSync(inputEvent);
  }, [inputEvent, eventSync]);
};
