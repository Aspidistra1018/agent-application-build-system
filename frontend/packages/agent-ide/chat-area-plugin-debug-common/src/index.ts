import { type PluginRegistryEntry } from '@coze-common/chat-area';

import { type PluginBizContext } from './types/biz-context';
import { BizPlugin } from './plugin';

export const getDebugCommonPluginRegistry = (props: PluginBizContext) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention -- Plugin names start with uppercase as expected
  const BizPluginRegistry: PluginRegistryEntry<PluginBizContext> = {
    /**
     * Context of components throughout the plug-in lifecycle
     */
    createPluginBizContext() {
      return {
        ...props,
      };
    },
    /**
     * plug-in ontology
     */
    Plugin: BizPlugin,
  };

  return BizPluginRegistry;
};
