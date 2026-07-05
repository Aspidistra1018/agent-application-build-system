import { type explore } from '@coze-studio/api-schema';
import { type UserInfo as ProductUserInfo } from '@coze-arch/bot-api/product_api';
type UserInfo = explore.product_common.UserInfo;

export interface CardInfoProps {
  title?: string;
  imgSrc?: string;
  description?: string;
  userInfo?: UserInfo | ProductUserInfo;
}

/** for open coze */
export enum PluginAuthMode {
  /** No authorization required */
  NoAuth = 0,
  /** Authorization is required, but not configured */
  Required = 1,
  /** Authorization is required and has been configured */
  Configured = 2,
  /** Authorization is required, but the configuration can be empty */
  Supported = 3,
}

export interface AuthMode {
  /** for open coze */
  auth_mode?: PluginAuthMode;
}
