import { useEffect } from 'react';

import classNames from 'classnames';
import {
  type ComponentTypesMap,
  useMessageBoxContext,
  useChatAreaStoreSet,
} from '@coze-common/chat-area';
import {
  ActionBarContainer,
  CopyTextMessage,
  QuoteMessage,
} from '@coze-common/chat-answer-action';

import { useChatAppProps } from '@/components/studio-open-chat/store';
import { useIsShowBackground } from '@/components/studio-open-chat/hooks/use-is-show-background';

import { useCurMessageInfo } from '../../hooks/use-cur-message-info';
import { DeleteMessage } from '../../components/delete-message';
import { useMessageFooterInfo } from './use-message-footer-info';

const ChatMessageFooterContent = () => {
  const { lastMessageText } = useMessageFooterInfo();
  const showBackground = useIsShowBackground();
  const { isShowDelete, isNeedQuote } = useCurMessageInfo();
  const buttonClass = showBackground ? '!coz-fg-images-white' : '';
  const isShowMessageFooter = !!lastMessageText || isShowDelete;
  if (!isShowMessageFooter) {
    return null;
  }
  return (
    <ActionBarContainer
      leftContent={[
        !!lastMessageText && (
          <CopyTextMessage
            key="copy"
            className={buttonClass}
            isUseExternalContent={true}
            externalContent={lastMessageText}
          />
        ),
        isShowDelete && (
          <DeleteMessage key="delete" className={classNames(buttonClass)} />
        ),
        !!lastMessageText && isNeedQuote && (
          <QuoteMessage className={classNames(buttonClass)} />
        ),
      ]}
      rightContent={[]}
    />
  );
};

export const UIKitMessageBoxFooter: ComponentTypesMap['messageActionBarFooter'] =
  ({ refreshContainerWidth }) => {
    const { meta } = useMessageBoxContext();
    const { message } = useMessageBoxContext();
    const { useWaitingStore } = useChatAreaStoreSet();
    const { readonly } = useChatAppProps();

    const waiting = useWaitingStore(state => !!state.waiting);
    const isAnswerMessage = message.type === 'answer';
    const isLastGroupMessage =
      meta.isGroupLastMessage && meta.isFromLatestGroup;

    useEffect(() => {
      refreshContainerWidth();
    }, []);

    if (!isLastGroupMessage || !isAnswerMessage || waiting || readonly) {
      /*
       * 以下情况不展示footer：
       *  非最后一个message
       *  非回答message
       *  进行中的message
       */
      return null;
    }
    return <ChatMessageFooterContent />;
  };
