import { useEffect, useRef } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { isEqual } from 'lodash-es';
import { useChatAreaStoreSet } from '@coze-common/chat-area';

import { useChatAppStore } from '../store';

export const useUpdateConversationNameByMessage = () => {
  const currentConversationNameRef = useRef<string>();
  const { updateCurrentConversationNameByMessage, currentConversationInfo } =
    useChatAppStore(
      useShallow(s => ({
        updateCurrentConversationNameByMessage:
          s.updateCurrentConversationNameByMessage,
        currentConversationInfo: s.currentConversationInfo,
      })),
    );

  const { useMessagesStore } = useChatAreaStoreSet();

  const messages = useMessagesStore(s => s.messages, isEqual);

  useEffect(() => {
    currentConversationNameRef.current = currentConversationInfo?.name;
  }, [currentConversationInfo]);

  useEffect(() => {
    const message = messages[messages.length - 1];
    const name = message?.content.slice(0, 100);
    if (message && !currentConversationNameRef.current) {
      updateCurrentConversationNameByMessage(name);
      currentConversationNameRef.current = name;
    }
  }, [messages]);
};
