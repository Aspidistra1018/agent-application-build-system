import { type ShortCutCommand } from '@coze-agent-ide/tool-config';
import {
  type SendMessageOptions,
  type TextAndFileMixMessageProps,
  type TextMessageProps,
} from '@coze-common/chat-core';

export interface ChatShortCutBarProps {
  shortcuts: ShortCutCommand[]; // Currently supports two shortcuts
  onClickShortCut: (shortcutInfo: ShortCutCommand) => void;
}
// After the update, the home is white debugging area and the store is grey.
export type UIMode = 'grey' | 'white' | 'blur'; // The default is white, and it is blurred when there is a background.

export interface OnBeforeSendTemplateShortcutParams {
  message: TextAndFileMixMessageProps;
  options?: SendMessageOptions;
}

export interface OnBeforeSendQueryShortcutParams {
  message: TextMessageProps;
  options?: SendMessageOptions;
}
