import { type ChatCoreError } from '@coze-common/chat-core';
import { type WriteableMessageLifeCycleServiceGenerator } from '@coze-common/chat-area';

import { isAuthError } from '@/util/error';

import { type PluginBizContext } from '../../types/biz-context';
export const messageLifeCycleServiceGenerator: WriteableMessageLifeCycleServiceGenerator<
  PluginBizContext
> = plugin => {
  let lastRetryId = '';
  return {
    onSendMessageError: async ctx => {
      const error = ctx.error as ChatCoreError;

      if (isAuthError(error?.ext?.code || 0) || error?.stack?.includes('401')) {
        await plugin.pluginBizContext?.refreshToken?.();
        const newRetryId =
          ctx.message.message_id || ctx.message?.extra_info?.local_message_id;
        if (newRetryId !== lastRetryId) {
          lastRetryId = newRetryId;
          plugin.pluginBizContext?.regenerateMessageByUserMessageId(newRetryId);
        }
      }
    },
  };
};
