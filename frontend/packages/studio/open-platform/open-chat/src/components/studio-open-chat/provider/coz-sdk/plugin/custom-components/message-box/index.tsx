import cls from 'classnames';
import { MessageBox as UIKitMessageBox } from '@coze-common/chat-uikit';
import { type CustomComponent } from '@coze-common/chat-area';

import styles from './index.module.less';
// coze-chat-message-wrapper coze-chat-hover-message-wrapper 用于element获取，不可删除
export const UIKitMessageBoxPlugin: CustomComponent['UIKitMessageBoxPlugin'] =
  ({ messageType, classname, ...props }) => (
    <UIKitMessageBox
      {...props}
      classname={cls(classname, 'w-full')}
      isHoverShowUserInfo={false}
      messageBoxWrapperClassname={cls(
        'coze-chat-message-wrapper',
        styles['message-box-wrapper'],
      )}
      messageHoverWrapperClassName={
        'w-full flex justify-end right-[0px] coze-chat-hover-message-wrapper'
      }
    />
  );
