import { type MethodCommonDeps } from '../../plugin/types';
import { useLoadMoreClient } from '../../context/load-more';
import { useChatActionLockService } from '../../context/chat-action-lock';
import {
  useChatAreaContext,
  useChatAreaStoreSet,
} from './use-chat-area-context';

/**
 * Acquire containers for use in non-responsive environments
 */
export const useMethodCommonDeps = (): MethodCommonDeps => {
  const context = useChatAreaContext();
  const loadMoreClient = useLoadMoreClient();
  const chatActionLockService = useChatActionLockService();
  const storeSet = useChatAreaStoreSet();

  return {
    context,
    storeSet,
    services: {
      loadMoreClient,
      chatActionLockService,
    },
  };
};
