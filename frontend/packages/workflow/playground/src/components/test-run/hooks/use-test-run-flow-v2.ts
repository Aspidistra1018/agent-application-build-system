import { useCallback } from 'react';

import { WorkflowMode } from '@coze-workflow/base/api';
import { useService } from '@flowgram-adapter/free-layout-editor';

import { WorkflowRunService } from '@/services';
import { useValidateWorkflow } from '@/hooks/use-validate-workflow';
import { useFloatLayoutService, useSaveService } from '@/hooks';
import { LayoutPanelKey } from '@/constants';

import { useTestFormSchema } from './use-test-form-schema';
import { useGetStartNode } from './use-get-start-node';

export const useTestRunFlowV2 = () => {
  const runService = useService<WorkflowRunService>(WorkflowRunService);
  const floatLayoutService = useFloatLayoutService();
  const saveService = useSaveService();
  const { getNode } = useGetStartNode();

  const { validate } = useValidateWorkflow();
  const { generate } = useTestFormSchema();
  const validateFlow = useCallback(async () => {
    const hasError = await validate();
    if (hasError) {
      floatLayoutService.open('problemPanel', 'bottom');
    }
    return hasError;
  }, [validate, floatLayoutService]);

  const testRunFlow = useCallback(async () => {
    const node = getNode();
    if (!node) {
      return;
    }
    // If the process is being saved, wait for the save to complete
    await saveService.waitSaving();
    // Save the process once
    await saveService.save();
    // Result of dry run
    runService.clearTestRun();
    if (runService.globalState.flowMode === WorkflowMode.ChatFlow) {
      // If it is chatflow verification, it needs to be blocked.
      if (await validateFlow()) {
        return;
      }
      floatLayoutService.open(LayoutPanelKey.TestChatFlowForm, 'right', {
        node,
      });
      return;
    }
    // The form can be opened first.
    floatLayoutService.open(LayoutPanelKey.TestFlowForm, 'right', { node });
    // Stop if the verification is wrong
    if (await validateFlow()) {
      return;
    }
    const schema = await generate();
    // Stop if there is a form entry
    if (schema?.fields.length) {
      return;
    }
    runService.testRun();
  }, [validateFlow, runService, floatLayoutService]);

  return { testRunFlow };
};
