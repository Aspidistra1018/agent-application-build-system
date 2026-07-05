import { useMemo } from 'react';

import { type SceneConfig } from '@coze-common/chat-core';

export const useBreakMessage = (): SceneConfig =>
  useMemo(() => {
    const config = {
      url: '/v3/chat/cancel',
      method: 'POST',
      hooks: {
        onBeforeRequest: [
          requestConfig => {
            const conversationId = requestConfig.data.conversation_id;
            const chatId = requestConfig.data.query_message_id;
            return {
              ...requestConfig,
              data: { conversation_id: conversationId, chat_id: chatId },
            };
          },
        ],
      },
    };
    return config;
  }, []);
