import { type CustomComponent } from '../../types/plugin-component';
import { type ChatAreaPluginContext } from '../../types/plugin-class/chat-area-plugin-context';
import { PluginMode, type PluginName } from '../../constants/plugin';

export abstract class ChatAreaPlugin<
  U extends PluginMode = PluginMode.Readonly,
  T = unknown,
  K = unknown,
> {
  /**
   * Business Context Information Owned by Business Parties
   */
  public pluginBizContext: T;
  /**
   * plugin name
   */
  public abstract pluginName: PluginName;
  /**
   * plugin pattern
   * @enum PluginMode. Readonly - Read Only
   * @enum PluginMode. Writeable
   */
  public pluginMode: PluginMode = PluginMode.Readonly;
  /**
   * Context provided by ChatArea
   */
  public chatAreaPluginContext: ChatAreaPluginContext<U>;
  /**
   * custom component
   */
  public customComponents?: Partial<CustomComponent>;
  constructor(
    pluginBizContext: T,
    chatAreaPluginContext: ChatAreaPluginContext<U>,
  ) {
    this.pluginBizContext = pluginBizContext;
    this.chatAreaPluginContext = chatAreaPluginContext;
  }
  /**
   * Business parties should not use: Inject ChatAreaContext information
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public _injectChatAreaContext(
    chatAreaPluginContext: ChatAreaPluginContext<U>,
  ) {
    if (this.chatAreaPluginContext) {
      console.error('Repeat inject chat area context');
      return;
    }

    this.chatAreaPluginContext = chatAreaPluginContext;
  }

  /**
   * Public methods of exposure
   */
  public publicMethods?: K;
}

export abstract class ReadonlyChatAreaPlugin<
  T = unknown,
  K = unknown,
> extends ChatAreaPlugin<PluginMode.Readonly, T, K> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor -- pass-through required
  constructor(
    pluginBizContext: T,
    chatAreaPluginContext: ChatAreaPluginContext<PluginMode.Readonly>,
  ) {
    super(pluginBizContext, chatAreaPluginContext);
  }
}

export abstract class WriteableChatAreaPlugin<
  T = unknown,
  K = unknown,
> extends ChatAreaPlugin<PluginMode.Writeable, T, K> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    pluginBizContext: T,
    chatAreaPluginContext: ChatAreaPluginContext<PluginMode.Writeable>,
  ) {
    super(pluginBizContext, chatAreaPluginContext);
  }
}
