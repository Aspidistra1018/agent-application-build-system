import { type Message } from '../store/types';
import { type IdAndSuggestion } from '../store/suggestions';

export const getIsSuggestion = (message: Message) =>
  message.type === 'follow_up';

export const splitMessageAndSuggestions = (messages: Message[]) => {
  const messageList: Message[] = [];
  const idAndSuggestions: IdAndSuggestion[] = [];
  for (const msg of messages) {
    if (getIsSuggestion(msg)) {
      /**
       * The last suggestion returned during the conversation will appear in the first item in the chat history
       * During conversation take push suggestion here handle chat history need to take unshift
       */

      idAndSuggestions.unshift({
        replyId: msg.reply_id,
        suggestion: msg.content,
      });
    } else {
      messageList.push(msg);
    }
  }
  return {
    messageList,
    idAndSuggestions,
  };
};
