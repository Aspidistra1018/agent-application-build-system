import { getStorageKey, LocalStorageKey } from '@/util';

export const getLocalMessageHistoryKey = (botId?: string) =>
  getStorageKey(LocalStorageKey.ChatHistory, botId);
