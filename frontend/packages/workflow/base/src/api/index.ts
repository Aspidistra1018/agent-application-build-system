import { workflowApi as archWorkflowApi } from '@coze-arch/bot-api';

// eslint-disable-next-line @coze-arch/no-batch-import-or-export
export * from '@coze-arch/bot-api/workflow_api';

export { withQueryClient, workflowQueryClient } from './with-query-client';

/** Operating the interface platform will replace permission verification */
const workflowOperationApiNameMap = {
  GetHistorySchema: 'OPGetHistorySchema',
  GetWorkFlowProcess: 'OPGetWorkFlowProcess',
  GetCanvasInfo: 'OPGetCanvasInfo',
  GetWorkflowReferences: 'OPGetWorkflowReferences',
  GetReleasedWorkflows: 'OPGetReleasedWorkflows',
  GetApiDetail: 'OPGetApiDetail',
  NodeTemplateList: 'OPNodeTemplateList',
  GetWorkflowGrayFeature: 'OPGetWorkflowGrayFeature',
  CheckLatestSubmitVersion: 'OPCheckLatestSubmitVersion',
  GetImageflowBasicNodeList: 'OPGetImageflowBasicNodeList',
  GetWorkflowDetail: 'OPGetWorkflowDetail',
  GetLLMNodeFCSettingDetail: 'OPGetLLMNodeFCSettingDetail',
  ListTriggerAppEvents: 'OPListTriggerAppEvents',
  GetTrigger: 'OPGetTrigger',
  GetWorkflowDetailInfo: 'OPGetWorkflowDetailInfo',
  GetNodeExecuteHistory: 'OPGetNodeExecuteHistory',
  VersionHistoryList: 'OPVersionHistoryList',
  GetChatFlowRole: 'OPGetChatFlowRole',
  ListRootSpans: 'OPListRootSpans',
  GetTraceSDK: 'OPGetTraceSDK',
};

const workflowApi: typeof archWorkflowApi = new Proxy(
  {} as unknown as typeof archWorkflowApi,
  {
    get: (target, name: string) => {
      if (IS_BOT_OP && workflowOperationApiNameMap[name]) {
        return archWorkflowApi[workflowOperationApiNameMap[name]].bind(
          archWorkflowApi,
        );
      } else {
        return archWorkflowApi[name].bind(archWorkflowApi);
      }
    },
  },
);

export { workflowApi };
