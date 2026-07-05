import {
  useChatAreaContext,
  useChatAreaStoreSet,
} from '../context/use-chat-area-context';
import { deleteMessageGroupById } from '../../utils/message-group/message-group';
import { useChatActionLockService } from '../../context/chat-action-lock';

// File messages and picture messages that are being uploaded are deleted, and side effects need to be cleared &
export const useDeleteMessageGroup = () => {
  const context = useChatAreaContext();
  const storeSet = useChatAreaStoreSet();
  const chatActionLockService = useChatActionLockService();

  return (groupId: string) =>
    deleteMessageGroupById(groupId, {
      ...context,
      storeSet,
      chatActionLockService,
    });
};
