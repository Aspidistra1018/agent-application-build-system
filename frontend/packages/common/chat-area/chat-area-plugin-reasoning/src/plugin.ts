import {
  PluginMode,
  PluginName,
  ReadonlyChatAreaPlugin,
  createReadonlyLifeCycleServices,
  createCustomComponents,
} from '@coze-common/chat-area';

import { type PluginBizContext } from './types/biz-context';
import { bizLifeCycleServiceGenerator } from './services/life-cycle';
import { BizMessageInnerAddonBottom } from './custom-components/message-inner-addon-bottom';

export class BizPlugin extends ReadonlyChatAreaPlugin<PluginBizContext> {
  /**
   * plugin type
   * PluginMode. Readonly = read-only mode
   * PluginMode. Writeable = Writable Mode
   */
  public pluginMode = PluginMode.Readonly;
  /**
   * plugin name
   * Please click PluginName to define it.
   */
  public pluginName = PluginName.Demo;

  /**
   * lifecycle services
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public lifeCycleServices: any = createReadonlyLifeCycleServices(
    this,
    bizLifeCycleServiceGenerator,
  );

  /**
   * custom component
   */
  public customComponents = createCustomComponents({
    TextMessageInnerTopSlot: BizMessageInnerAddonBottom,
  });
}
