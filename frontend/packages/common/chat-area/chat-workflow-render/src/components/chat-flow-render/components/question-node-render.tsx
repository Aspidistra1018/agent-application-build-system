import {
  type IEventCallbacks,
  type IMessage,
} from '@coze-common/chat-uikit-shared';
import { Button, Space, Typography } from '@coze-arch/coze-design';

import { type ChatflowNodeData } from './type';
import { NodeWrapperUI } from './node-wrapper-ui';

export const QuestionNodeRender = ({
  data,
  onCardSendMsg,
  readonly,
  isDisable,
  message,
}: {
  data: ChatflowNodeData;
  onCardSendMsg?: IEventCallbacks['onCardSendMsg'];
  readonly?: boolean;
  isDisable?: boolean;
  message: IMessage;
}) => {
  const disabled = readonly || isDisable;
  return (
    <NodeWrapperUI>
      <Space className="w-full" vertical spacing={12} align="start">
        <Typography.Text ellipsis className="text-18px">
          {data.question_card_data?.Title}
        </Typography.Text>
        <Space className="w-full" vertical spacing={16}>
          {data.question_card_data?.Options?.map((option, index) => (
            <Button
              key={option.name + index}
              className="w-full"
              color="primary"
              disabled={disabled}
              onClick={() =>
                onCardSendMsg?.({
                  message,
                  extra: { msg: option.name, mentionList: [] },
                })
              }
            >
              {option.name}
            </Button>
          ))}
        </Space>
      </Space>
    </NodeWrapperUI>
  );
};
