import {
  type ComponentProps,
  type AuthProps,
  type UiProps,
  type OpenUserInfo,
  type ChatType,
  type AppInfo,
  type BotInfo,
} from '@coze-studio/open-chat/types';

export interface CozeChatOptions {
  config: {
    /** @deprecated 该使用方式已废弃，请使用botId   */
    bot_id?: string;

    /** @deprecated 该使用方式已废弃，请使用botId   */
    botId?: string;
    /** @deprecated 该字段已废弃，请使用auth字段进行配置 */
    sdk_verify_token?: string;
    type?: ChatType;

    appInfo?: AppInfo;
    botInfo?: BotInfo;
  };
  extra?: {
    webChat: Record<string, string>;
  };
  auth?: AuthProps;
  userInfo?: OpenUserInfo;
  ui?: UiProps;
  /** @deprecated 该使用方式已废弃，请使用ui属性对ui进行配置 */
  el?: HTMLElement;

  /** @deprecated 该使用方式已废弃，请使用ui属性对ui进行配置 */
  componentProps?: ComponentProps; // 待废弃
}
