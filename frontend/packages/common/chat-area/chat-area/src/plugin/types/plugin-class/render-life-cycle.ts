import { type ContentType } from '@coze-common/chat-core';
import { type InsertedElementItem } from '@coze-arch/bot-md-box-adapter';

import { type CustomComponent } from '../plugin-component';
import { type MessageMeta, type Message } from '../../../store/types';

export interface OnTextContentRenderingContext {
  insertedElements: InsertedElementItem[] | undefined;
  message: Message;
}

export interface OnMessageBoxRenderContext {
  /**
   * Dynamic injection of custom rendering components
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention -- matches the expected naming
  MessageBox?: CustomComponent['MessageBox'];
  /**
   * message body
   */
  message: Message<ContentType>;
  /**
   * Meta
   */
  meta: MessageMeta;
}
