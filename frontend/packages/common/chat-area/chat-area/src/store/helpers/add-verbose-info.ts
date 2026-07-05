import { VerboseMsgType } from '@coze-common/chat-core';

import { type MessageMeta } from '../types';

/**
 *
 * @param metaList
 */
export const addJumpVerboseInfo = (metaList: MessageMeta[]) => {
  // Scan from back to front, encounter jumpVerbose message, set the same reply_id answer message for hasJumpVerbose to true
  let lastJumpVerboseMeta = null;
  for (let i = metaList.length - 1; i >= 0; i--) {
    const current = metaList[i];
    if (!current) {
      continue;
    }
    if (current.verboseMsgType === VerboseMsgType.JUMP_TO) {
      lastJumpVerboseMeta = current;
      continue;
    }

    const isSameGroup =
      lastJumpVerboseMeta && current.replyId === lastJumpVerboseMeta.replyId;
    const isAnswer = current.type === 'answer';

    if (isSameGroup && isAnswer) {
      current.beforeHasJumpVerbose = true;
    }
  }
};
