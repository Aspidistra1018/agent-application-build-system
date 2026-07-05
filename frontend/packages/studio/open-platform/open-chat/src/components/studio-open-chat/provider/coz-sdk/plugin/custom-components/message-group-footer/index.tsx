import { type CustomComponent } from '@coze-common/chat-area';

import { useMessageGroupFooterInfo } from './use-message-group-footer-info';
export const UIKitMessageGroupFooterPlugin: CustomComponent['MessageGroupFooter'] =
  ({ messageGroup }) => {
    const { isLatest } = messageGroup;
    const { isShowFeedbackInLastGroup, cozeApiMessageId } =
      useMessageGroupFooterInfo(messageGroup);

    if (!isLatest || !isShowFeedbackInLastGroup || !cozeApiMessageId) {
      return null;
    }
    return <div className="ml-[24px] mr-[24px]"></div>;
  };
