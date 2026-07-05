import { type Message, type MessageMeta } from '@coze-common/chat-area';

import { getIsPushedMessage } from './get-is-pushed-message';

export const getShowFeedback = ({
  message,
  meta,
  latestSectionId,
}: {
  message: Pick<Message, 'type' | 'source'>;
  meta: Pick<
    MessageMeta,
    'isFromLatestGroup' | 'sectionId' | 'isGroupLastAnswerMessage'
  >;
  latestSectionId: string;
}): boolean => {
  // Is it a pushed message?
  const isPushedMessage = getIsPushedMessage(message);
  if (isPushedMessage) {
    return false;
  }

  // The final answer from the last message group
  return (
    meta.isGroupLastAnswerMessage &&
    meta.isFromLatestGroup &&
    meta.sectionId === latestSectionId
  );
};
