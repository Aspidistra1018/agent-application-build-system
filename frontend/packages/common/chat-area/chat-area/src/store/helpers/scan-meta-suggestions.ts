import { type MessageGroup } from '../types';

/**
 * You must process showContextDivider before you can call it
 */
export const scanAndMarkShowSuggestions = (
  messageGroupList: MessageGroup[],
) => {
  const lastMessageGroup = messageGroupList.at(0);
  if (!lastMessageGroup) {
    return;
  }
  lastMessageGroup.showSuggestions = !lastMessageGroup.showContextDivider;
};
