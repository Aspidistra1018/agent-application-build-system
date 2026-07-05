import { type WriteableCommandLifeCycleServiceGenerator } from '@coze-common/chat-area';

import { type PluginBizContext } from '../../types/biz-context';

export const commandLifeCycleServiceGenerator: WriteableCommandLifeCycleServiceGenerator<
  PluginBizContext
> = plugin => ({
  /*onImageClick: async ctx => {
    const url = ctx.url;
    plugin.pluginBizContext.onImageClick?.({
      url
    });
  }*/
});
