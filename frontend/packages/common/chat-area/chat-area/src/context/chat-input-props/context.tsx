import { type ReactNode, createContext } from 'react';

import {
  type IChatInputProps,
  type InputNativeCallbacks,
} from '@coze-common/chat-uikit-shared';

type OnBeforeSubmit = IChatInputProps['onBeforeSubmit'];

export interface ChatInputProps
  extends Pick<IChatInputProps, 'leftActions' | 'rightSlot'> {
  /**
   * {@link OnBeforeSubmit}
   */
  onBeforeSubmit?: OnBeforeSubmit;
  submitClearInput?: boolean;
  /**
   * @deprecated
   */
  addonBottom?: ReactNode;
  uploadButtonTooltipContent?: ReactNode;
  wrapperClassName?: string;
  inputNativeCallbacks?: InputNativeCallbacks;
  safeAreaClassName?: string;
  getContainer?: () => HTMLElement;
}

export const ChatInputPropsContext = createContext<ChatInputProps>({});
