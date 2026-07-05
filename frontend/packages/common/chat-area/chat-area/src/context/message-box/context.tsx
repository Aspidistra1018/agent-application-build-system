import { createContext } from 'react';

import { type MessageMeta, type Message } from '../../store/types';

// TODO can be further optimized.
export interface MessageBoxContextProviderProps {
  messageUniqKey: string;
  groupId: string;
  message: Message | undefined;
  meta: MessageMeta | undefined;
  regenerateMessage: () => Promise<void>;
  isFirstUserOrFinalAnswerMessage: boolean;
  isLastUserOrFinalAnswerMessage: boolean;
  functionCallMessageIdList?: string[];
  /** Is the group to which this message belongs having a conversation? */
  isGroupChatActive: boolean;
}

export const MessageBoxContext = createContext<MessageBoxContextProviderProps>({
  messageUniqKey: '',
  groupId: '',
  regenerateMessage: () => Promise.resolve(),
  isFirstUserOrFinalAnswerMessage: false,
  isLastUserOrFinalAnswerMessage: false,
  message: undefined,
  meta: undefined,
  isGroupChatActive: false,
});
