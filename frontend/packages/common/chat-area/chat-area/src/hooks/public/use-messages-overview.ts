import { useShallow } from 'zustand/react/shallow';

import { useChatAreaStoreSet } from '../context/use-chat-area-context';

export const useMessagesOverview = () => {
  const { useMessagesStore, useSectionIdStore } = useChatAreaStoreSet();

  const latestSectionId = useSectionIdStore(state => state.latestSectionId);

  /**
   * Filter inserted messages
   */
  const { isEmpty, latestSectionHasMessage } = useMessagesStore(
    useShallow(state => ({
      isEmpty: state.messages.length === 0,
      // Todo is optimized for group judgment, no need to scan all messages
      latestSectionHasMessage: !!state.messages.filter(
        msg => msg.section_id === latestSectionId,
      ).length,
    })),
  );

  return {
    isEmpty,
    latestSectionHasMessage,
  };
};
