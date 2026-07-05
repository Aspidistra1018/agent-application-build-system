import { type ClientStore } from '@/store/global';
import { type WebChatClient } from '@/client';

export interface CozeWidgetProps {
  position?: 'static' | 'fixed';
  client: WebChatClient;
  globalStore: ClientStore;
}

export type WidgetAdapterProps = Pick<CozeWidgetProps, 'position' | 'client'>;
export type AstBtnProps = WidgetAdapterProps;
export type ChatIframProps = Pick<CozeWidgetProps, 'client'>;
export type ChatContentProps = Pick<CozeWidgetProps, 'client'>;
