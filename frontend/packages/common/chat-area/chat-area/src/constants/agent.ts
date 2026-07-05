import { AgentType } from '@coze-arch/bot-api/developer_api';

// TODO: Why is there no i18n to do here?
// Node type name mapping relationship
export const agentTypeNameMap: { [key in AgentType]: string | undefined } = {
  [AgentType.LLM_Agent]: 'Agent',
  [AgentType.Bot_Agent]: 'Bot',
  [AgentType.Global_Agent]: 'Bot',
  [AgentType.Start_Agent]: 'Bot',
  [AgentType.Task_Agent]: 'Bot',
};
