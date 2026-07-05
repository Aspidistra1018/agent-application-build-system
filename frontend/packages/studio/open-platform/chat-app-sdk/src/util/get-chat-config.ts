import { nanoid } from 'nanoid';
import { pick } from 'lodash-es';
import { ChatType } from '@coze-studio/open-chat/types';
import { OpenApiSource, type IframeParams } from '@coze-studio/open-chat/types';

import { type CozeChatOptions } from '@/types/client';

export const getChatConfig = (
  chatClientId: string,
  cozeChatOption: CozeChatOptions,
): IframeParams => {
  const { config, auth, userInfo, ui, extra } = cozeChatOption;
  return {
    chatClientId,
    chatConfig: {
      type: config?.type || ChatType.BOT,
      bot_id: (config?.botId ?? config?.bot_id) || '',
      appInfo: config?.appInfo,
      botInfo: config?.botInfo,
      conversation_id: nanoid(),
      extra,
      ui: {
        base: pick(ui?.base || {}, ['icon', 'lang', 'layout']),
        chatBot: pick(ui?.chatBot || {}, [
          'title',
          'uploadable',
          'isNeedClearContext',
          'isNeedClearMessage',
          'isNeedAudio',
          'isNeedFunctionCallMessage',
          'isNeedQuote',
          'isNeedAddNewConversation',
          'feedback',
        ]),
        footer: ui?.footer,
        header: ui?.header,
        conversations: ui?.conversations,
      },
      auth: pick(auth || {}, ['type', 'token']),
      source: OpenApiSource.WebSdk,
    },
    userInfo,
  };
};
