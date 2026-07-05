import { useChatActionLockService } from '@coze-common/chat-area/context/chat-action-lock';
import { useChatAreaStoreSet } from '@coze-common/chat-area';
import { I18n } from '@coze-arch/i18n';
import { Toast } from '@coze-arch/coze-design';

import { useChatCozeSdk } from '../../context';

export const useDeleteMessage = () => {
  const storeSet = useChatAreaStoreSet();
  const chatActionLockService = useChatActionLockService();
  const { cozeApiSdk } = useChatCozeSdk();

  return async (conversationId: string, messageId: string) => {
    if (!messageId || !conversationId) {
      return;
    }

    const { useMessagesStore, useSuggestionsStore } = storeSet;
    const { findMessage, isLastMessageGroup } = useMessagesStore.getState();
    const { clearSuggestions } = useSuggestionsStore.getState();

    const messageInfo = findMessage(messageId);
    const groupId = messageInfo?.reply_id;
    // @ts-expect-error -- linter-disable-autofix, 新添加参数，接口未支持
    const cozeApiMessageId = messageInfo?.extra_info?.coze_api_message_id;
    if (!messageInfo || !groupId) {
      throw new Error(`message not found, id: ${messageId}`);
    }

    if (
      chatActionLockService.answerAction.getIsLock(
        groupId,
        'deleteMessageGroup',
      )
    ) {
      return;
    }

    chatActionLockService.answerAction.lock(groupId, 'deleteMessageGroup');

    const isLast = isLastMessageGroup(groupId);

    const { deleteMessageById } = useMessagesStore.getState();

    try {
      await cozeApiSdk?.conversations.messages.delete(
        conversationId,
        cozeApiMessageId,
      );
      deleteMessageById(messageId);
      if (isLast) {
        clearSuggestions();
      }
    } catch (e) {
      console.error(e);
      Toast.error(I18n.t('Delete_failed'));
    } finally {
      chatActionLockService.answerAction.unlock(groupId, 'deleteMessageGroup');
    }
  };
};
