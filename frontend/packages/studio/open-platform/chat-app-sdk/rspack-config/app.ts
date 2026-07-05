import { configs as GLOBAL_ENVS } from '@coze-studio/bot-env-adapter/configs';

import { openSdkDefineEnvs } from './env';
import { IS_OVERSEA } from './base';

export const getRspackAppDefineEnvs = () => ({
  ...openSdkDefineEnvs,
  /**
   * ChatArea 依赖
   */
  IS_OVERSEA,
  CARD_BUILDER_ENV_STR: JSON.stringify(GLOBAL_ENVS.CARD_BUILDER_ENV_STR),
  SAMI_WS_ORIGIN: JSON.stringify(GLOBAL_ENVS.SAMI_WS_ORIGIN),
  SAMI_APP_KEY: JSON.stringify(GLOBAL_ENVS.SAMI_APP_KEY),
  SAMI_CHAT_WS_URL: JSON.stringify(GLOBAL_ENVS.SAMI_CHAT_WS_URL),
  COZE_API_TTS_BASE_URL: JSON.stringify(GLOBAL_ENVS.COZE_API_TTS_BASE_URL),
  FEATURE_ENABLE_MSG_DEBUG: false,
  APP_ID: '""',
  COZE_DOMAIN: JSON.stringify(GLOBAL_ENVS.COZE_DOMAIN),
});
