import {
  type CreateChatAreaPluginContextParams,
  createChatAreaPluginContext,
} from '../plugin/plugin-context';
import {
  type ReadonlyChatAreaPlugin,
  type WriteableChatAreaPlugin,
} from '../plugin/plugin-class/plugin';
import { type ChatAreaProviderProps } from '../context/chat-area-context/type';

interface InitPluginsProps {
  pluginRegistryList: ChatAreaProviderProps['pluginRegistryList'];
}

export const initPlugins = (
  params: InitPluginsProps & CreateChatAreaPluginContextParams,
) => {
  const {
    pluginRegistryList = [],
    storeSet,
    refreshMessageList,
    reporter,
    eventCallback,
    lifeCycleService,
    getCommonDeps,
  } = params;

  /**
   * Plugin registration starts
   */
  const pluginInstanceList: (
    | ReadonlyChatAreaPlugin<object>
    | WriteableChatAreaPlugin<object>
  )[] = [];

  for (const registerPlugin of pluginRegistryList) {
    if (
      !registerPlugin ||
      !registerPlugin.createPluginBizContext ||
      !registerPlugin.Plugin
    ) {
      console.error('register plugin has params empty!');
      continue;
    }

    // Create business context
    const pluginBizContext = registerPlugin.createPluginBizContext();

    // Create a built-in context for chat-area
    const chatAreaPluginContext = createChatAreaPluginContext({
      storeSet,
      refreshMessageList,
      reporter,
      eventCallback,
      lifeCycleService,
      getCommonDeps,
    });

    // Initialize the business plug-in instance
    const pluginInstance = new registerPlugin.Plugin(
      pluginBizContext,
      chatAreaPluginContext,
    );

    pluginInstanceList.push(pluginInstance);
  }
  const { usePluginStore } = storeSet;
  usePluginStore.getState().setPluginInstanceList(pluginInstanceList);
  /**
   * Plugin registration ends
   */

  return () => {
    usePluginStore.getState().offAllSubscription();
  };
};
