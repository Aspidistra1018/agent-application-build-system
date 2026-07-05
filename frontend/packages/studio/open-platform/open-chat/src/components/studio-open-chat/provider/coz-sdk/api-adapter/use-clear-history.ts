import { useMemo, useRef } from 'react';

import { type SceneConfig } from '@coze-common/chat-core';

import { OpenApiSource } from '@/types/open';
import { useChatAppProps } from '@/components/studio-open-chat/store';
import { useUserInfo } from '@/components/studio-open-chat/hooks';

import { type ChatProviderFunc } from '../type';
export const useClearHistoryAdapter = ({
  refChatFunc,
}: {
  refChatFunc?: React.MutableRefObject<ChatProviderFunc | undefined>;
}): SceneConfig => {
  const { chatConfig } = useChatAppProps();
  const refConnectorId = useRef('');
  const userInfo = useUserInfo();
  refConnectorId.current = chatConfig?.auth?.connectorId || '';

  return useMemo(() => {
    const onAfterResponse = [
      response => {
        const { data: resCreateConversation } = response;
        const { code, data: conversationData } = resCreateConversation;
        const { id: conversationId, last_section_id: sectionId } =
          conversationData || {};
        refChatFunc?.current?.setConversationId(conversationId, sectionId);
        return {
          ...response,
          data: {
            code,
            new_section_id: sectionId,
          },
        };
      },
    ];
    const config = {
      url:
        IS_OPEN_SOURCE && chatConfig.source === OpenApiSource.ChatFlow
          ? '/v1/workflow/conversation/create'
          : '/v1/conversation/create',
      method: 'POST',
      hooks: {
        onBeforeRequest: [
          requestConfig => {
            const botId = requestConfig.data.bot_id;
            return {
              ...requestConfig,
              data: {
                bot_id: botId,
                connector_id: refConnectorId.current,
                user_id: IS_OPEN_SOURCE ? userInfo?.id : undefined,
              },
            };
          },
        ],
        onErrorResponse: onAfterResponse,
        onAfterResponse,
      },
    };
    return config;
  }, []);
};
