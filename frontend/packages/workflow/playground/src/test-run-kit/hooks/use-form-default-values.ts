import { type IFormSchema } from '@coze-workflow/test-run-next';
import { useTestFormService } from '@coze-workflow/test-run';

import { useGlobalState, useTestRunReporterService } from '@/hooks';

import { getNodeExecuteHistoryInput } from '../utils';

export const useFormDefaultValues = () => {
  const testFormService = useTestFormService();
  const globalState = useGlobalState();
  const reporter = useTestRunReporterService();
  const getDefaultValues = async (schema: IFormSchema) => {
    if (!schema) {
      return;
    }
    const nodeId = schema['x-node-id'] || '';
    const nodeType = schema['x-node-type'] || '';

    // Highest merit: The last value the user filled in
    const cacheData = testFormService.getCacheValues(nodeId);
    if (cacheData) {
      reporter.formGenDataOrigin({ gen_data_origin: 'cache' });
      return cacheData;
    }

    const historyValues = await getNodeExecuteHistoryInput({
      workflowId: globalState.workflowId,
      spaceId: globalState.spaceId,
      nodeId,
      nodeType,
    });
    if (historyValues) {
      reporter.formGenDataOrigin({ gen_data_origin: 'history' });
      return historyValues;
    }
  };

  return { getDefaultValues };
};
