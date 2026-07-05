import { I18n } from '@coze-arch/i18n';
import { type Conversation as CozeConversation } from '@coze/api';

declare module '@coze/api' {
  interface Conversation {
    name?: string;
    updated_at: number;
  }
}

export enum ConversationSort { // 数字越小，越靠前
  Today = 0,
  In30days = 1,
  Others = 999,
}

export const conversationSortMap = new Map([
  [ConversationSort.Today, I18n.t('profile_history_today', {}, '今天')],
  [
    ConversationSort.In30days,
    I18n.t('log_pay_wall_date_filter_30_days', {}, '过去30天'),
  ],
  [ConversationSort.Others, I18n.t('web_sdk_past', {}, '过往')],
]);

export interface SortedConversationItem extends CozeConversation {
  sort: ConversationSort;
  name?: string;
}
