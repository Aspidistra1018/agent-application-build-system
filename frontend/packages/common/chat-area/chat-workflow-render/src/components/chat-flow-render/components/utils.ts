import { type IMessage } from '@coze-common/chat-uikit-shared';
import { safeJSONParse } from '@coze-common/chat-uikit';

import { type ChatflowNodeData } from './type';

export const extractChatflowMessage = (message: IMessage) => {
  if (message.content_type === 'card') {
    const contentStruct = safeJSONParse(message.content) as {
      x_properties: {
        workflow_card_info: string;
      };
    };
    const workflowDataStr = contentStruct?.x_properties?.workflow_card_info;
    if (workflowDataStr) {
      const cardData = safeJSONParse(workflowDataStr) as ChatflowNodeData;
      if (cardData?.card_type === 'QUESTION' && cardData?.question_card_data) {
        return cardData;
      }
      if (cardData?.card_type === 'INPUT' && cardData?.input_card_data) {
        return cardData;
      }
    }
  }
};
