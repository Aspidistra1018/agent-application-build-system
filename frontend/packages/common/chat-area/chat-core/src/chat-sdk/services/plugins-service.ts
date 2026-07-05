import { exhaustiveCheckSimple } from '@coze-common/chat-area-utils';

import type { UploadPluginConstructor } from '@/plugins/upload-plugin/types/plugin-upload';

import type { PluginKey, PluginValue } from '../types/interface';

export class PluginsService {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any -- I didn't think of a suitable type of gymnastics for the time being, use any first,
  UploadPlugin: UploadPluginConstructor<any> | null = null;
  uploadPluginConstructorOptions: Record<string, unknown> = {};

  /**
   * Register plugin
   */
  registerPlugin<T extends PluginKey, P extends Record<string, unknown>>(
    key: T,
    plugin: PluginValue<T, P>,
    constructorOptions?: P,
  ) {
    if (key === 'upload-plugin') {
      this.UploadPlugin = plugin;
      this.uploadPluginConstructorOptions = constructorOptions || {};
    }
  }

  /**
   * Check if the plugin has been registered
   */
  checkPluginIsRegistered(key: PluginKey): boolean {
    if (key === 'upload-plugin') {
      return !!this.UploadPlugin;
    }

    return false;
  }

  getRegisteredPlugin(key: PluginKey) {
    if (key === 'upload-plugin') {
      return this.UploadPlugin;
    }
    exhaustiveCheckSimple(key);
  }
}
