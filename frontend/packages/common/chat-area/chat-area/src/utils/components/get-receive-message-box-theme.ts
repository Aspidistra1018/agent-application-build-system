import { type MessageBoxTheme } from '@coze-common/chat-uikit';
import { ContentType } from '@coze-common/chat-core';

import { type Message } from '../../store/types';
import { type PreferenceContextInterface } from '../../context/preference/types';
import { type OnParseReceiveMessageBoxTheme } from '../../context/chat-area-context/chat-area-callback';

export const getReceiveMessageBoxTheme = ({
  message,
  bizTheme,
  onParseReceiveMessageBoxTheme,
}: {
  message: Message;
  bizTheme: PreferenceContextInterface['theme'];
  onParseReceiveMessageBoxTheme: OnParseReceiveMessageBoxTheme | undefined;
}): MessageBoxTheme => {
  const isThemeDisabled =
    message.type === 'follow_up' || message.content_type === ContentType.Card;
  const isBorderTheme = message.content_type === ContentType.Image;
  const customParsed = onParseReceiveMessageBoxTheme?.({ message });

  if (customParsed) {
    return customParsed;
  }

  if (isBorderTheme) {
    return 'border';
  }

  if (isThemeDisabled) {
    return 'none';
  }

  //  After enabling uikit refactoring, home is whiteness and the rest of the scenes are grey
  if (bizTheme === 'home') {
    return 'whiteness';
  }

  return 'grey';
};
