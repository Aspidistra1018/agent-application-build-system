import { useQuery } from '@tanstack/react-query';
import { IntelligenceType } from '@coze-arch/idl/intelligence_api';
import {
  type GetDraftBotInfoAgwData,
  type ModelInfo,
} from '@coze-arch/bot-api/playground_api';
import { type BotTable } from '@coze-arch/bot-api/memory';
import { PlaygroundApi } from '@coze-arch/bot-api';

import { type IBotSelectOption } from './types';

export const useBotInfo = (botId?: string) => {
  const { isLoading, data: botInfo } = useQuery({
    queryKey: ['bot_info', botId || ''],
    queryFn: async () => {
      if (!botId) {
        return undefined;
      }

      const { data } = await PlaygroundApi.GetDraftBotInfoAgw({
        bot_id: botId,
      });
      return data;
    },
  });

  return { isLoading, botInfo };
};

// Data conversion using bot information for wf
export const transformBotInfo = {
  // model data
  model: (data?: GetDraftBotInfoAgwData): ModelInfo =>
    data?.bot_info?.model_info ?? {},
  // Basic information data
  basicInfo: (
    botInfo?: GetDraftBotInfoAgwData,
  ): IBotSelectOption | undefined => {
    if (!botInfo) {
      return undefined;
    }
    return {
      name: botInfo?.bot_info?.name ?? '',
      avatar: botInfo?.bot_info?.icon_url ?? '',
      value: botInfo?.bot_info?.bot_id ?? '',
      type: IntelligenceType.Bot,
    };
  },
  // database information
  database: (botInfo?: GetDraftBotInfoAgwData): BotTable[] | undefined =>
    botInfo?.bot_info?.database_list,
  // Variable information
  variable: (botInfo?: GetDraftBotInfoAgwData) =>
    botInfo?.bot_info?.variable_list,
};
