import { useShallow } from 'zustand/react/shallow';
import cls from 'classnames';
import { IconCozSideNav } from '@coze-arch/coze-design/icons';
import { Button, IconButton } from '@coze-arch/coze-design';
import { Typography } from '@coze-arch/bot-semi';

import { useChatAppStore } from '@/components/studio-open-chat/store';
import {
  useChatChatButtonInfo,
  useChatOpInfo,
} from '@/components/studio-open-chat/hooks/use-chat-op-info';
import CozeLogoPng from '@/assets/coze-logo.png';

import { type ChatHeaderProps } from '../type';

import styles from './index.module.less';

const ChatHeaderMobile = ({
  iconUrl = CozeLogoPng,
  title = 'Coze Bot',
  extra,
  theme,
  isShowConversations,
}: ChatHeaderProps) => {
  const { headerTopLeftOps } = useChatOpInfo();
  const buttonList = useChatChatButtonInfo(headerTopLeftOps);

  const { updateCurrentConversationInfo, currentConversationInfo } =
    useChatAppStore(
      useShallow(s => ({
        updateCurrentConversationInfo: s.updateCurrentConversationInfo,
        currentConversationInfo: s.currentConversationInfo,
      })),
    );

  return (
    <header
      className={cls(styles.header, {
        [styles['bg-theme']]: theme === 'bg-theme',
      })}
    >
      {currentConversationInfo?.conversationListVisible ||
      !isShowConversations ? null : (
        <IconButton
          color="secondary"
          icon={<IconCozSideNav width="18px" height="18px" />}
          className={styles['conversation-list-btn']}
          onClick={() => {
            if (!currentConversationInfo) {
              return;
            }
            updateCurrentConversationInfo({
              ...currentConversationInfo,
              conversationListVisible: true,
            });
          }}
        />
      )}
      <img className={styles.avatar} src={iconUrl} alt="avatar" />
      <Typography.Text
        className={styles.title}
        ellipsis={{
          rows: 1,
        }}
      >
        {title}
      </Typography.Text>
      {buttonList?.map(item => (
        <Button
          color="secondary"
          icon={item.icon}
          className={styles['icon-btn']}
          disabled={item.disabled}
          onClick={() => {
            item.onClick?.();
          }}
        />
      ))}

      {!!extra && extra}
    </header>
  );
};

export default ChatHeaderMobile;
