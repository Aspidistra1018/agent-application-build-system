import {
  type IEventCallbacks,
  type IMessage,
} from '@coze-common/chat-uikit-shared';

interface RenderNodeBaseProps extends Pick<IEventCallbacks, 'onCardSendMsg'> {
  isDisable: boolean | undefined;
  readonly: boolean | undefined;
}
export interface RenderNodeEntryProps extends RenderNodeBaseProps {
  message: IMessage;
}
export interface ChatflowNodeData {
  card_type: 'QUESTION' | 'INPUT';
  input_card_data?: {
    type: string;
    name: string;
  }[];
  question_card_data?: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Title: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Options: { name: string }[];
  };
}
export interface ChatflowNodeData {
  card_type: 'QUESTION' | 'INPUT';
  input_card_data?: {
    type: string;
    name: string;
  }[];
  question_card_data?: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Title: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Options: { name: string }[];
  };
}
