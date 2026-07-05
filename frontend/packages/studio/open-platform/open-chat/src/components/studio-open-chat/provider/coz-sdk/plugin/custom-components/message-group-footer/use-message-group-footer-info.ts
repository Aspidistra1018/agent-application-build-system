import { useMemo } from 'react';

import {
  type MessageGroup,
  useChatAreaStoreSet,
} from '@coze-common/chat-area';

import { useChatAppStore } from '@/components/studio-open-chat/store';
export const useMessageGroupFooterInfo = (messageGroup: MessageGroup) => {
  const feedbackInfo = useChatAppStore(s => s.feedbackInfo);
  const { useMessagesStore } = useChatAreaStoreSet();
  const { findMessage } = useMessagesStore.getState();

  const lastGroupFeedbackInfo = useChatAppStore(s => s.lastGroupFeedbackInfo);
  const { messageId } = lastGroupFeedbackInfo;
  const messageInfo = findMessage(messageId || '');
  // @ts-expect-error -- linter-disable-autofix, 新添加参数，接口未支持
  const cozeApiMessageId = messageInfo?.extra_info?.coze_api_message_id;

  const isShowFeedbackInLastGroup = useMemo(() => {
    if (
      lastGroupFeedbackInfo.isShowCustomPanel &&
      messageId &&
      feedbackInfo[cozeApiMessageId] === 'thumbDown'
    ) {
      // 当前message已经是点踩了，同时需要展示自定义面板

      return messageGroup.memberSet.llmAnswerMessageIdList.includes(messageId);
    }
    return false;
  }, [feedbackInfo, lastGroupFeedbackInfo, messageGroup]);
  return { isShowFeedbackInLastGroup, cozeApiMessageId };
};
