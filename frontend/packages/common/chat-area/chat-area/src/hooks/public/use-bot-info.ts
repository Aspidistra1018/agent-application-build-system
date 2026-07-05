import { useShallow } from 'zustand/react/shallow';

import { useChatAreaStoreSet } from '../context/use-chat-area-context';

export const useBotInfo = () => {
  const { useSenderInfoStore } = useChatAreaStoreSet();

  return useSenderInfoStore(
    useShallow(state => ({
      getBotInfo: state.getBotInfo,
      updateBotInfo: state.updateBotInfo,
      setSenderInfoBatch: state.setSenderInfoBatch,
    })),
  );
};

export const useBotInfoWithSenderId = (senderId?: string) => {
  const { useSenderInfoStore } = useChatAreaStoreSet();
  const { botInfo } = useSenderInfoStore(
    useShallow(state => ({
      botInfo: senderId ? state.getBotInfo(senderId) : undefined,
    })),
  );

  return botInfo;
};

/**
 * Return action, stable reference
 */
export const useSetBotInfoBatch = () => {
  const { useSenderInfoStore } = useChatAreaStoreSet();

  return useSenderInfoStore(state => state.setSenderInfoBatch);
};
