import { type FC } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { I18n } from '@coze-arch/i18n';
import { IconCozArrowRightFill } from '@coze-arch/coze-design/icons';
import { IconButton, Tooltip } from '@coze-arch/coze-design';

import { useChatAppStore } from '../studio-open-chat/store';
import { type ChatHeaderProps } from './type';
import ChatHeaderPC from './pc';
import ChatHeaderMobile from './mobile';

import styles from './index.module.less';

const FloatBtn = () => {
  const { updateCurrentConversationInfo, currentConversationInfo } =
    useChatAppStore(
      useShallow(s => ({
        updateCurrentConversationInfo: s.updateCurrentConversationInfo,
        currentConversationInfo: s.currentConversationInfo,
      })),
    );
  return currentConversationInfo?.conversationListVisible ? null : (
    <Tooltip content={I18n.t('web_sdk_open_conversations')}>
      <IconButton
        className={styles['float-open-conversations-btn']}
        size="small"
        style={{
          height: '32px',
          borderTopLeftRadius: 'unset',
          borderBottomLeftRadius: 'unset',
        }}
        icon={<IconCozArrowRightFill />}
        onClick={() => {
          if (!currentConversationInfo) {
            return;
          }
          updateCurrentConversationInfo({
            ...currentConversationInfo,
            conversationListVisible: true,
          });
        }}
      ></IconButton>
    </Tooltip>
  );
};

export const ChatHeader: FC<ChatHeaderProps & { isMobile?: boolean }> = ({
  isMobile,
  ...props
}) => {
  const { isShowConversations, isShowHeader } = props;
  if (!isShowHeader) {
    return isShowConversations ? <FloatBtn /> : null;
  }
  return isMobile ? (
    <ChatHeaderMobile {...props} />
  ) : (
    <ChatHeaderPC {...props} />
  );
};
