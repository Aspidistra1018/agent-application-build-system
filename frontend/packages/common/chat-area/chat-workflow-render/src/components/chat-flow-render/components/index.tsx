import { memo, useMemo } from 'react';

import { isEqual, isFunction, omitBy } from 'lodash-es';

import { extractChatflowMessage } from './utils';
import { type ChatflowNodeData, type RenderNodeEntryProps } from './type';
import { QuestionNodeRender } from './question-node-render';
import { InputNodeRender } from './input-node-render';

const BaseComponent: React.FC<RenderNodeEntryProps> = ({
  message,
  ...restProps
}) => {
  const chatflowNodeData: ChatflowNodeData | undefined = useMemo(
    () => extractChatflowMessage(message),
    [message],
  );
  if (!chatflowNodeData) {
    return null;
  }
  if (chatflowNodeData.card_type === 'INPUT') {
    return (
      <InputNodeRender
        data={chatflowNodeData}
        message={message}
        {...restProps}
      />
    );
  } else if (chatflowNodeData.card_type === 'QUESTION') {
    return (
      <QuestionNodeRender
        data={chatflowNodeData}
        message={message}
        {...restProps}
      />
    );
  } else {
    return 'content type is not supported';
  }
};

export const WorkflowRenderEntry = memo(BaseComponent, (prevProps, nextProps) =>
  isEqual(omitBy(prevProps, isFunction), omitBy(nextProps, isFunction)),
);
