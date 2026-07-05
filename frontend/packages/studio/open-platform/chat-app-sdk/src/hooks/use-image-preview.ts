import { useCallback, useEffect } from 'react';

import {
  type PostMessage,
  PostMessageEvent,
} from '@coze-studio/open-chat/types';

import { postMessageUtil } from '@/types/post';
import { useGlobalStore } from '@/store';
import { type WebChatClient } from '@/client';

export const useImagePreview = (client: WebChatClient) => {
  const { setImagePreview } = useGlobalStore(s => ({
    setImagePreview: s.setImagePreview,
  }));
  const onMessageHandler = useCallback<{
    (event: MessageEvent<PostMessage>): void;
  }>(
    event => {
      const msg = event?.data;

      if (msg.chatStoreId !== client.chatClientId) {
        return;
      }

      switch (msg.event) {
        case PostMessageEvent.ImageClick:
          // @ts-expect-error -- linter-disable-autofix
          if (postMessageUtil.isImageClick(msg)) {
            setImagePreview(preview => {
              preview.url = msg.payload.url;
              preview.visible = true;
            });
          }
          break;
        default:
      }
    },
    [setImagePreview, client],
  );

  useEffect(() => {
    window.addEventListener('message', onMessageHandler);
    return () => {
      window.removeEventListener('message', onMessageHandler);
    };
  }, [onMessageHandler]);
};
