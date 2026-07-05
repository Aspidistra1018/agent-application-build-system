import { parseMarkdownToGrabNode } from '@coze-common/text-grab';
import {
  ContentType,
  type CustomTextMessageInnerTopSlot,
} from '@coze-common/chat-area';

import { QuoteNode } from '../quote-node';
import { getReferFromMessage } from '../../utils/get-refer-from-message';
import { QuoteTopUI } from './quote-top-ui';

export const RemoteQuoteInnerTopSlot: CustomTextMessageInnerTopSlot = ({
  message,
}) => {
  // It was not sent locally with server level.
  const refer = getReferFromMessage(message);

  if (!refer) {
    return null;
  }

  if (refer.type === ContentType.Image) {
    return (
      <QuoteTopUI>
        <img className="w-[24px] h-[24px] rounded-[4px]" src={refer.url} />
      </QuoteTopUI>
    );
  }

  // Try to parse ast.
  const nodeList = parseMarkdownToGrabNode(refer.text);

  return (
    <QuoteTopUI>
      <QuoteNode nodeList={nodeList} theme="white" />
    </QuoteTopUI>
  );
};
