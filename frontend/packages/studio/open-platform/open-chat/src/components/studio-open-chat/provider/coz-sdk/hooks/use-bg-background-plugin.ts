import { useEffect, useMemo } from 'react';

import {
  createChatBackgroundPlugin,
  ChatBackgroundEventName,
} from '@coze-common/chat-area-plugin-chat-background';

import {
  useChatAppProps,
  useChatAppStore,
} from '@/components/studio-open-chat/store';
export const useBgBackgroundPlugin = () => {
  const { ChatBackgroundPlugin, chatBackgroundEvent } = useMemo(
    () => createChatBackgroundPlugin(),
    [],
  );
  const { isCustomBackground } = useChatAppProps();

  const backgroundInfo = useChatAppStore(s => s.backgroundInfo);
  const backgroundInfoToShow = isCustomBackground ? undefined : backgroundInfo;
  useEffect(() => {
    // 监听用户设置背景图，将更新的背景图信息传入插件
    chatBackgroundEvent.emit(
      ChatBackgroundEventName.OnBackgroundChange,
      backgroundInfoToShow || {
        mobile_background_image: {},
        web_background_image: {},
      },
    );
  }, [backgroundInfoToShow]);

  return {
    ChatBackgroundPlugin,
  };
};
