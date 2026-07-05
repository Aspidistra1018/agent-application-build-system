import { type SenderInfo } from '@coze-common/chat-area';

export type OpenUserInfo = Omit<SenderInfo, 'allowMention'>;
export type OpenBotInfo = OpenUserInfo;
