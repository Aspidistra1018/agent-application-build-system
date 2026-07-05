import { useState, useMemo } from 'react';

import {
  VCSCanvasType,
  WorkFlowDevStatus,
  WorkFlowStatus,
} from '@coze-workflow/base/api';

import { useValidateWorkflow } from '@/hooks/use-validate-workflow';
import {
  useGlobalState,
  useFloatLayoutService,
  useTestRunReporterService,
} from '@/hooks';

import { useTestRunFlowV2 } from '../../../test-run/hooks/use-test-run-flow-v2';

export const useForcePush = () => {
  const [visible, setVisible] = useState(false);
  const testRunReporterService = useTestRunReporterService();
  const { isCollaboratorMode, info, inPluginUpdated } = useGlobalState();
  const { validate } = useValidateWorkflow();
  const { testRunFlow } = useTestRunFlowV2();
  const floatLayoutService = useFloatLayoutService();

  const { status, vcsData } = info;
  const { type } = vcsData || {};

  const needTestRun = useMemo(() => {
    // When the plugin is updated, it needs to be re-testrun.
    if (inPluginUpdated) {
      return true;
    }
    if (isCollaboratorMode) {
      // Draft status, and the status is not submittable, you need to re-testrun
      if (info.vcsData?.type === VCSCanvasType.Draft) {
        return (
          info.status !== WorkFlowDevStatus.CanSubmit &&
          info.status !== WorkFlowDevStatus.HadSubmit
        );
      }
      return false;
    } else {
      return (
        info.status !== WorkFlowStatus.CanPublish &&
        info.status !== WorkFlowStatus.HadPublished
      );
    }
  }, [isCollaboratorMode, status, type, inPluginUpdated]);

  const tryPushCheck = async () => {
    /** Validation Process */
    if (await validate()) {
      floatLayoutService.open('problemPanel', 'bottom');
      return false;
    }
    /** Need test run */
    if (needTestRun) {
      setVisible(true);
      return false;
    }
    return true;
  };

  const handleCancel = () => setVisible(false);

  const handleTestRun = () => {
    setVisible(false);
    testRunReporterService.tryStart({
      scene: 'publish',
    });
    testRunFlow();
  };

  return {
    visible,
    tryPushCheck,
    onCancel: handleCancel,
    onTestRun: handleTestRun,
  };
};
