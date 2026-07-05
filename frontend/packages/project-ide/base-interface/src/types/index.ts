import type {
  MessageOperateType,
  MessageBizType,
} from '@coze-arch/bot-api/workflow_api';

export interface WsMessageProps {
  resId: string;
  extra: any;
  /**
   * Other window execution saves the incoming version number
   */
  saveVersion?: string;
  operateType: MessageOperateType;
  bizType: MessageBizType;
}
