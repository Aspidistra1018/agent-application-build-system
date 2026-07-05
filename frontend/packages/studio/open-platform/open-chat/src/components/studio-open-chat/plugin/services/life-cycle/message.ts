import { type WriteableMessageLifeCycleServiceGenerator } from '@coze-common/chat-area';
import { Toast } from '@coze-arch/bot-semi';

import { catchParse } from '@/util';

import { type PluginBizContext } from '../../types/biz-context';

export const messageLifeCycleServiceGenerator: WriteableMessageLifeCycleServiceGenerator<
  PluginBizContext
> = plugin => ({
  onSendMessageError: ctx => {
    const { error } = ctx;
    if (error instanceof Error) {
      const res = catchParse<{ code?: number; msg?: string }>(
        error.message,
        {},
      );
      if (res?.code && res?.msg) {
        Toast.error(res.msg);
      }
    }
  },
  onBeforeSendMessage: ctx => {
    const { options = {} } = ctx;
    const optionNew = Object.assign({}, options, {
      extendFiled: {
        ...options?.extendFiled,
        extra: {
          ...(options?.extendFiled?.extra || {}),
          ...(plugin.pluginBizContext.extraBody || {}),
        },
      },
    });
    return { ...ctx, options: optionNew };
  },
});
