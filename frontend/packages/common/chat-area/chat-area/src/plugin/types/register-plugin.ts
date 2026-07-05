import {
  type ReadonlyChatAreaPlugin,
  type WriteableChatAreaPlugin,
} from '../plugin-class/plugin';
import { type ChatAreaPluginContext } from './plugin-class/chat-area-plugin-context';

/**
 * @deprecated, use PluginRegistryEntry
 */
export interface RegisterPlugin<T = unknown> {
  // Function to create a context, expecting to return the plug-in context type
  createPluginBizContext: () => T;
  // plugin implementation class
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Plugin: new (
    context: T,
    // @ts-expect-error -- unknown should be required here.
    chatAreaPluginContext: ChatAreaPluginContext<unknown>,
  ) => ReadonlyChatAreaPlugin<T> | WriteableChatAreaPlugin<T>;
}

export type PluginRegistryEntry<T> = RegisterPlugin<T>;
