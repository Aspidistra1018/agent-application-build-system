import { forwardRef, type PropsWithChildren } from 'react';

import {
  type ChatAreaProviderMethod,
  type ChatAreaProviderProps,
} from './type';
/**
 * Delete the code after 1 week and keep it temporarily just in case.
 */
import { ChatAreaProviderNew } from './provider-new';

export const ChatAreaProvider = forwardRef<
  ChatAreaProviderMethod,
  PropsWithChildren<ChatAreaProviderProps>
>((props, ref) => <ChatAreaProviderNew {...props} ref={ref} />);

ChatAreaProvider.displayName = 'ChatAreaProvider';
