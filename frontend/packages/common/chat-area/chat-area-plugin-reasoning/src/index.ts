import { type PluginRegistryEntry } from '@coze-common/chat-area';

import { type PluginBizContext } from './types/biz-context';
import { BizPlugin } from './plugin';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Plugin names start with uppercase as expected
export const ReasoningPluginRegistry: PluginRegistryEntry<PluginBizContext> = {
  /**
   * Context of components throughout the plug-in lifecycle
   */
  createPluginBizContext() {
    return {};
  },
  /**
   * plug-in ontology
   */
  Plugin: BizPlugin,
};
