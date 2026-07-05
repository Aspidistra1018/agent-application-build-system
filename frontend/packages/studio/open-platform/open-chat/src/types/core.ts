import { type EventPayloadMaps as BaseEventPayloadMap } from '@coze-common/chat-core';
import type { MixInitResponse } from '@coze-common/chat-area';

export type EventPayloadMap = BaseEventPayloadMap & {
  ready: boolean;
};

// @ts-expect-error -- linter-disable-autofix
export type ChatMessage = MixInitResponse['messageList'][number];
