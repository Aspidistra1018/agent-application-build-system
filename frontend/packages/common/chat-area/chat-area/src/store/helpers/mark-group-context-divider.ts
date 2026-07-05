import { type Message, type MessageGroup } from '../types';
import { getMessagesByGroup } from '../../utils/message-group/get-message-by-group';

/**
 * !!! mutate
 * @Param group will be changed
 */
export const markGroupShowContextDivider = ({
  group,
  messages,
  isShow,
}: {
  group: MessageGroup;
  isShow: boolean;
  messages: Message[];
}) => {
  if (!isShow) {
    group.showContextDivider = null;
    return;
  }

  const groupMessages = getMessagesByGroup(group, messages);

  // security policy
  if (
    groupMessages.some(message => Boolean(message.extra_info.new_section_id))
  ) {
    group.showContextDivider = 'without-onboarding';
    return;
  }

  group.showContextDivider = 'with-onboarding';
  return;
};
