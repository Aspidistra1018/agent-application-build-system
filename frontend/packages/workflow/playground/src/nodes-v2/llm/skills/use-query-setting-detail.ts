import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  type DatasetFCItem,
  type GetLLMNodeFCSettingDetailResponse,
  type PluginFCItem,
  workflowApi,
  type WorkflowFCItem,
} from '@coze-workflow/base/api';

import { PromiseLimiter } from '@/utils/promise-limiter';

// Limit concurrency, because there may be many LLM nodes on the same process, simultaneously requesting
const CONCURRENCY = 3;

const limiter = new PromiseLimiter(CONCURRENCY, true);

export const useQuerySettingDetail = (params: {
  workflowId: string;
  spaceId: string;
  nodeId: string;
  plugin_list?: Array<PluginFCItem>;
  workflow_list?: Array<WorkflowFCItem>;
  dataset_list?: Array<DatasetFCItem>;
  enabled?: boolean;
}): UseQueryResult<GetLLMNodeFCSettingDetailResponse> => {
  const { nodeId, enabled = true } = params;
  return useQuery({
    queryKey: [nodeId, 'settingDetail'],
    queryFn: () =>
      limiter.run(() =>
        workflowApi.GetLLMNodeFCSettingDetail({
          workflow_id: params.workflowId,
          space_id: params.spaceId,
          plugin_list: params.plugin_list,
          workflow_list: params.workflow_list,
          dataset_list: params.dataset_list,
        }),
      ),
    enabled,
  });
};
