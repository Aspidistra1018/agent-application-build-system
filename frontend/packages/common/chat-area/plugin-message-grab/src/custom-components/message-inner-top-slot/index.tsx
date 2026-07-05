import { useShallow } from 'zustand/react/shallow';
import {
  PluginName,
  useWriteablePlugin,
  type CustomTextMessageInnerTopSlot,
} from '@coze-common/chat-area';

import { type GrabPluginBizContext } from '../../types/plugin-biz-context';
import { RemoteQuoteInnerTopSlot } from './remote-slot';
import { LocalQuoteInnerTopSlot } from './local-slot';

export const QuoteMessageInnerTopSlot: CustomTextMessageInnerTopSlot = ({
  message,
}) => {
  const localMessageId = message.extra_info.local_message_id;

  const plugin = useWriteablePlugin<GrabPluginBizContext>(
    PluginName.MessageGrab,
  );

  const { useQuoteStore } = plugin.pluginBizContext.storeSet;

  // Preference is given to locally mapped
  const hasLocal = useQuoteStore(
    useShallow(state => !!state.quoteContentMap[localMessageId]),
  );

  if (hasLocal) {
    return <LocalQuoteInnerTopSlot message={message} />;
  }

  return <RemoteQuoteInnerTopSlot message={message} />;
};
