import { type PluginRegistryEntry } from '@coze-common/chat-area';

import { type PluginBizContext } from './types/biz-context';
import { BizPlugin } from './plugin';

export type UIBuilderEventCallbackPlugin =
  PluginRegistryEntry<PluginBizContext>;
export const getBuilderEventCallbackPlugin = (
  props: PluginBizContext,
): PluginRegistryEntry<unknown> => {
  const uiBuilderEventCallbackPlugin: UIBuilderEventCallbackPlugin = {
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
  return uiBuilderEventCallbackPlugin as PluginRegistryEntry<unknown>;
};
