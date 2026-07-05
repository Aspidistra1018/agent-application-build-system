import { useMemo } from 'react';

import { type SceneConfig } from '@coze-common/chat-core';

export const useClearMessageContextAdapter = (): SceneConfig =>
  useMemo(() => {
    const onAfterResponse = [
      response => {
        const { data } = response;
        const { code, data: res } = data;
        return {
          ...response,
          data: {
            code,
            new_section_id: res.id,
          },
        };
      },
    ];
    return {
      url: '/v1/conversations/:conversation_id/clear',
      hooks: {
        onBeforeRequest: [
          requestConfig => {
            const conversationId = requestConfig.data.conversation_id;
            const url = `/v1/conversations/${conversationId}/clear`;
            return {
              ...requestConfig,
              url,
              data: { conversation_id: conversationId },
            };
          },
        ],
        onErrorResponse: onAfterResponse,
        onAfterResponse,
      },
    };
  }, []);
