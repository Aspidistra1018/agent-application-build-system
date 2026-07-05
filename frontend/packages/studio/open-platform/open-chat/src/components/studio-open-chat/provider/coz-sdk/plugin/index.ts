import { type PluginRegistryEntry } from '@coze-common/chat-area';

import { type PluginBizContext } from './types/biz-context';
import { BizPlugin } from './plugin';

export const getCozeSdkPlugin = (props: PluginBizContext) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const WebsdkChatExtraBodyPlugin: PluginRegistryEntry<PluginBizContext> = {
    /**
     * 贯穿插件生命周期、组件的上下文
     */
    createPluginBizContext() {
      return { ...props };
    },
    /**
     * 插件本体
     */
    Plugin: BizPlugin,
  };
  return WebsdkChatExtraBodyPlugin;
};
