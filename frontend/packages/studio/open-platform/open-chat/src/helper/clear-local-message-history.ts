import { storageUtil } from '@/util';

import { getLocalMessageHistoryKey } from './get-local-message-history-key';
export const clearLocalMessageHistory = (botId: string) => {
  const chatHistoryStorageKey = getLocalMessageHistoryKey(botId);
  storageUtil.setItem(chatHistoryStorageKey, []);
};
