import { useMemo } from 'react';

import { isEqual } from 'lodash-es';
import {
  useMessageBoxContext,
  useChatAreaStoreSet,
  getIsTextMessage,
} from '@coze-common/chat-area';

export const useMessageFooterInfo = () => {
  const { groupId } = useMessageBoxContext();
  const { useMessagesStore } = useChatAreaStoreSet();

  const messageGroupList = useMessagesStore(s => s.messageGroupList, isEqual);
  const messages = useMessagesStore(s => s.messages, isEqual);
  const findMessage = useMessagesStore(s => s.findMessage, isEqual);

  const lastMessageText = useMemo(() => {
    const messageGroup = messageGroupList.find(
      group => group.groupId === groupId,
    );
    return messageGroup?.memberSet.llmAnswerMessageIdList
      .map(item => {
        const messageItem = findMessage(item);
        if (getIsTextMessage(messageItem)) {
          return messageItem.content;
        }
        return '';
      })
      .filter(item => !!item)
      .reverse()
      .join('\n');
  }, [messageGroupList, messages, findMessage, groupId]);
  return {
    lastMessageText,
  };
};
