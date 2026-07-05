import {
  PluginMode,
  PluginName,
  WriteableChatAreaPlugin,
  createWriteableLifeCycleServices,
} from '@coze-common/chat-area';

import { type PluginBizContext } from './types/biz-context';
import { bizLifeCycleServiceGenerator } from './services/life-cycle';

export class BizPlugin extends WriteableChatAreaPlugin<PluginBizContext> {
  /**
   * plugin type
   * PluginMode. Readonly = read-only mode
   * PluginMode. Writeable = Writable Mode
   */
  public pluginMode = PluginMode.Writeable;
  /**
   * plugin name
   * Please click PluginName to define it.
   */
  public pluginName = PluginName.DebugCommon;

  /**
   * lifecycle services
   */
  public lifeCycleServices = createWriteableLifeCycleServices(
    this,
    bizLifeCycleServiceGenerator,
  );
}
