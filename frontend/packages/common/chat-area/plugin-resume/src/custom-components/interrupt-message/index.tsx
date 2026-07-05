import { useState } from 'react';

import classNames from 'classnames';
import { MessageBox as UIKitMessageBox } from '@coze-common/chat-uikit';
import { type CustomComponent } from '@coze-common/chat-area';

import { InterruptMessageContent } from './interrupt-message-content';

import styles from './index.module.less';

export const InterruptMessageBox: CustomComponent['MessageBox'] = props => {
  // Copywriting after user operation, front-end maintenance temporary state, refresh and disappear
  const [actionText, setActionText] = useState('');

  const { message, meta } = props;

  // Do not show logic: chat history, no action and not in the last group
  if (message._fromHistory || (!actionText && !meta.isFromLatestGroup)) {
    return null;
  }

  return (
    <div className={classNames(styles['interrupt-message-box'])}>
      <UIKitMessageBox
        {...props}
        messageId={message.message_id}
        senderInfo={{ id: '' }}
        showUserInfo={false}
        theme={actionText ? 'none' : 'border'}
      >
        <InterruptMessageContent
          interruptMessage={message}
          actionText={actionText}
          setActionText={setActionText}
        />
      </UIKitMessageBox>
    </div>
  );
};

InterruptMessageBox.displayName = 'ChatAreaFunctionCallMessageBox';
