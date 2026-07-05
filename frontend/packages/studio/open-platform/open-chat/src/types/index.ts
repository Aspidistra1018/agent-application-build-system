import { type ContentType, type Message } from '@coze-common/chat-core';
export { type ImageMessageContent } from '@coze-common/chat-core';
export { type OnboardingSuggestionItem } from '@coze-common/chat-area';

export interface ImagePreview {
  visible: boolean;
  url: string;
}
export type OnImageClick = (extra: { url: string }) => void;

export type CoreMessage = Message<ContentType>;

export enum MessageRole {
  User = 'user',
  Assistant = 'assistant',
}

export enum MessageType {
  Answer = 'answer',
  Verbose = 'verbose',
}
