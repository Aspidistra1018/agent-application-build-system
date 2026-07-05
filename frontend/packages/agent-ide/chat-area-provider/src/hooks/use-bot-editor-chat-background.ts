import { useEffect } from 'react';

import { useBotSkillStore } from '@coze-studio/bot-detail-store/bot-skill';
import {
  createChatBackgroundPlugin,
  chatBackgroundEvent,
  ChatBackgroundEventName,
} from '@coze-common/chat-area-plugin-chat-background';

// Handling chat background covers communication with plugins in BotEditor
export const useBotEditorChatBackground = () => {
  const backgroundInfo = useBotSkillStore(
    state => state.backgroundImageInfoList?.[0],
  );
  const { ChatBackgroundPlugin } = createChatBackgroundPlugin();

  useEffect(() => {
    // Monitor the user to set the background cover and pass the updated background cover information to the plugin
    chatBackgroundEvent.emit(
      ChatBackgroundEventName.OnBackgroundChange,
      backgroundInfo,
    );
  }, [backgroundInfo]);

  return {
    ChatBackgroundPlugin,
    showBackground: !!backgroundInfo?.mobile_background_image?.origin_image_url,
  };
};
