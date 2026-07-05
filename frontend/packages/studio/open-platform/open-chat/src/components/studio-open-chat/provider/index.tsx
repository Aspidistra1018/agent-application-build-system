import React, { useEffect, type FC } from 'react';

import { type PluginRegistryEntry } from '@coze-common/chat-area';

import { type StudioChatProviderProps } from '@/types/props';

import { ChatPropsProvider } from '../store/context';
import { useChatAppProps, useChatAppStore } from '../store';
import { getChatCommonPlugin } from '../plugin';
import { useGetTheme } from '../hooks/use-get-theme';
import { ChatProvider as ChatProviderCozeSdk } from './coz-sdk/chat-provider';

const ChatProvider: FC<{
  children: React.ReactNode;
  plugins?: PluginRegistryEntry<unknown>[];
}> = ({ children, plugins }) => {
  const { chatConfig, onImageClick, onThemeChange } = useChatAppProps();
  const setInitError = useChatAppStore(s => s.setInitError);
  // plugin初始化
  const commonChatPlugin = getChatCommonPlugin({
    onImageClick,
    onInitialError: () => {
      setInitError(true);
    },
    extraBody: chatConfig.extra?.webChat,
  });
  const theme = useGetTheme();
  useEffect(() => {
    onThemeChange?.(theme);
  }, [theme]);
  return (
    <ChatProviderCozeSdk
      plugins={[
        commonChatPlugin as PluginRegistryEntry<unknown>,
        ...(plugins || []),
      ]}
    >
      {children}
    </ChatProviderCozeSdk>
  );
};

export const OpenChatProvider: FC<
  StudioChatProviderProps & {
    children: React.ReactNode;
    plugins?: PluginRegistryEntry<unknown>[];
  }
> = ({ children, plugins, ...props }) => (
  <ChatPropsProvider appProps={props}>
    <ChatProvider plugins={plugins}>{children}</ChatProvider>
  </ChatPropsProvider>
);
