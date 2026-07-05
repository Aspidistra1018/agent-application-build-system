import { type MessageMeta } from '../types';

export const addAnswerLocation = (metaList: MessageMeta[]) => {
  const answerMessageMeta = metaList.filter(meta => meta.type === 'answer');
  // Scan from backwards to forwards, encounter the first different reply_id, restart setting isFirstAnswer
  let lastAnswerMeta = null;
  for (let i = answerMessageMeta.length - 1; i >= 0; i--) {
    const current = answerMessageMeta[i];
    if (!current) {
      continue;
    }
    if (!lastAnswerMeta) {
      current.isGroupFirstAnswer = true;
      lastAnswerMeta = current;
      continue;
    }

    if (current.replyId !== lastAnswerMeta.replyId) {
      current.isGroupFirstAnswer = true;
      lastAnswerMeta = current;
    }
  }
};
