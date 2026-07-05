import type { Model, ModelInfo } from '@coze-arch/bot-api/developer_api';

/** Model Settings */
export interface BotDetailModel {
  config: ModelInfo;
  /** All optional models */
  modelList: Model[];
}
