import { type MixMessageContent } from '@coze-common/chat-core/message/types';
import {
  useMessageBoxContext,
  getIsTextMessage,
  ContentType,
} from '@coze-common/chat-area';

import { catchParse } from '@/util';

export const useMessageHoverInfo = () => {
  const { meta, message } = useMessageBoxContext();
  const isNeedHoverAnswer =
    message.type === 'answer' &&
    (!meta.isFromLatestGroup || !meta.isGroupLastAnswerMessage);

  let showHoverText: string | undefined;
  let isMultiMessage = false;
  if (message.type === 'question' || message.type === 'ack') {
    // question 会存在mix的数据结构，需获取text的值
    if (getIsTextMessage(message)) {
      showHoverText = message.content;
    } else if (message?.content_type === ContentType.Mix) {
      const contentObj = catchParse<MixMessageContent>(message.content);
      showHoverText = contentObj?.item_list
        .map(item => (item.type === 'text' && item.text) || '')
        .filter(item => !!item)
        .join('\n');

      isMultiMessage = (contentObj?.item_list?.length || 0) > 1;
    }
  } else if (isNeedHoverAnswer) {
    if (getIsTextMessage(message)) {
      showHoverText = message.content;
    }
  }
  return {
    showHoverText,
    isMultiMessage,
  };
};
