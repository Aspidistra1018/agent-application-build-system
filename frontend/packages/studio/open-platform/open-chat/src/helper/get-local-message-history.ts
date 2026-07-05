import { type MixInitResponse } from '@coze-common/chat-area';

import { storageUtil } from '@/util';

import { getLocalMessageHistoryKey } from './get-local-message-history-key';

export const getLocalMessageHistory = (botId: string) => {
  const chatHistoryStorageKey = getLocalMessageHistoryKey(botId);
  const messageList: MixInitResponse['messageList'] =
    storageUtil.getItem(chatHistoryStorageKey, []) || [];
  return messageList;
};
