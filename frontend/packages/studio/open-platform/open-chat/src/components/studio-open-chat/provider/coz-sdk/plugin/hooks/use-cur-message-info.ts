import { useMessageBoxContext } from '@coze-common/chat-area';

import { useChatAppProps } from '@/components/studio-open-chat/store';

export const useCurMessageInfo = () => {
  const { message } = useMessageBoxContext();
  const { chatConfig } = useChatAppProps();

  // @ts-expect-error -- linter-disable-autofix, 新添加参数，接口未支持
  const cozeApiMessageId = message.extra_info.coze_api_message_id;
  // @ts-expect-error -- linter-disable-autofix, 新添加参数，接口未支持
  const cozeApiChatId = message.extra_info.coze_api_chatId_id;
  return {
    messageId: message.message_id,
    cozeApiMessageId,
    cozeApiChatId,
    isShowDelete: false, // 暂时下掉删除按钮
    isNeedQuote: chatConfig.ui?.chatBot?.isNeedQuote ?? false,
  };
};
