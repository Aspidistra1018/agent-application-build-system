import { exhaustiveCheckForRecord } from '@coze-common/chat-area-utils';

import {
  type ReadonlyLifeCycleServiceGenerator,
  type WriteableLifeCycleServiceGenerator,
} from '../types/utils/create-life-cycle-service';
import {
  type ReadonlyLifeCycleServiceCollection,
  type WriteableLifeCycleServiceCollection,
} from '../types/plugin-class/life-cycle';
import {
  type WriteableChatAreaPlugin,
  type ReadonlyChatAreaPlugin,
} from '../plugin-class/plugin';

/**
 * To create a helper function for a writable lifecycle
 */
export const createWriteableLifeCycleServices = <T = unknown, K = unknown>(
  plugin: WriteableChatAreaPlugin<T, K>,
  generator: WriteableLifeCycleServiceGenerator<T, K>,
): WriteableLifeCycleServiceCollection<T, K> => {
  const lifeCycleService = generator(plugin);

  // In order not to affect the historical logic, the return value filters out the pluginInstance property
  bindPluginInstance<T, K>(
    lifeCycleService as unknown as WriteableLifeCycleServiceCollection<T, K>,
    plugin,
  );

  return lifeCycleService as unknown as WriteableLifeCycleServiceCollection<
    T,
    K
  >;
};

/**
 * To create a helper function for a writable lifecycle
 */
export const createReadonlyLifeCycleServices = <T = unknown, K = unknown>(
  plugin: ReadonlyChatAreaPlugin<T, K>,
  generator: ReadonlyLifeCycleServiceGenerator<T, K>,
): ReadonlyLifeCycleServiceCollection<T, K> => {
  const lifeCycleService = generator(plugin);

  // In order not to affect the historical logic, the return value filters out the pluginInstance property
  bindPluginInstance<T, K>(
    lifeCycleService as unknown as ReadonlyLifeCycleServiceCollection<T, K>,
    plugin,
  );

  return lifeCycleService as unknown as ReadonlyLifeCycleServiceCollection<
    T,
    K
  >;
};

/**
 * For adaptation of historical logic, support for continued access to data through pluginInstance
 */
const bindPluginInstance = <T = unknown, K = unknown>(
  lifeCycleService:
    | ReadonlyLifeCycleServiceCollection<T, K, false>
    | WriteableLifeCycleServiceCollection<T, K, false>,
  plugin: ReadonlyChatAreaPlugin<T, K> | WriteableChatAreaPlugin<T, K>,
) => {
  const {
    appLifeCycleService,
    messageLifeCycleService,
    commandLifeCycleService,
    renderLifeCycleService,
    ...rest
  } = lifeCycleService;
  exhaustiveCheckForRecord(rest);

  if (appLifeCycleService) {
    appLifeCycleService.pluginInstance = plugin;
  }

  if (messageLifeCycleService) {
    messageLifeCycleService.pluginInstance = plugin;
  }

  if (commandLifeCycleService) {
    commandLifeCycleService.pluginInstance = plugin;
  }

  if (renderLifeCycleService) {
    renderLifeCycleService.pluginInstance = plugin;
  }
};
