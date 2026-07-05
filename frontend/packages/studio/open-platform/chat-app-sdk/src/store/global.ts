import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { create } from 'zustand';
import { produce } from 'immer';
import { type ImagePreview, Layout } from '@coze-studio/open-chat/types';
import { ChatSdkErrorType, postErrorMessage } from '@coze-studio/open-chat';

import { type AuthClient } from '@/client/auth';
import { type WebChatClient } from '@/client';

interface ClientState {
  chatVisible: boolean;
  iframe?: HTMLIFrameElement;
  iframeLoaded: boolean;
  imagePreview: ImagePreview;
  layout: Layout;
  senderName: string;
  themeType: 'bg-theme' | 'light';
}

interface ClientAction {
  setIframe: (el?: HTMLIFrameElement) => void;
  setIframeLoaded: (loaded: boolean) => void;
  setChatVisible: (visible: boolean) => void;
  setImagePreview: (recipe: (preview: ImagePreview) => void) => void;
  setThemeType: (themeType: 'bg-theme' | 'light') => void;
}

export type ClientStateAction = ClientState & ClientAction;

export const createGlobalStore = (client: WebChatClient) => {
  const { options, senderName } = client;
  const { layout = Layout.PC } = options?.ui?.base ?? {};
  const authClient = client.authClient as AuthClient;
  const defaultState: ClientState = {
    chatVisible: false,
    iframeLoaded: false,
    themeType: 'light',
    imagePreview: {
      url: '',
      visible: false,
    },
    layout,
    senderName,
  };

  return create<ClientStateAction>()(
    devtools(
      subscribeWithSelector(set => ({
        ...defaultState,
        setThemeType: (themeType: 'bg-theme' | 'light') => {
          set({
            themeType,
          });
        },
        setIframe: element => {
          set({
            iframe: element,
          });
        },
        setChatVisible: async visible => {
          const chatBot = options?.ui?.chatBot;
          if (authClient && !(await authClient.initToken())) {
            postErrorMessage({
              type: ChatSdkErrorType.OPEN_API_ERROR,
              code: 401,
              message: 'invalid token',
            });
            return;
          }
          // 判断是否能够显示、隐藏
          if (visible) {
            if ((await chatBot?.onBeforeShow?.()) === false) {
              return;
            }
          } else {
            if ((await chatBot?.onBeforeHide?.()) === false) {
              return;
            }
          }
          set({
            chatVisible: visible,
          });
          // 显示、隐藏后的回调。
          if (visible) {
            chatBot?.onShow?.();
          } else {
            chatBot?.onHide?.();
          }
        },
        setIframeLoaded: loaded => {
          set({
            iframeLoaded: loaded,
          });
        },
        setImagePreview: recipe =>
          set(
            produce<ClientState>(draft => {
              recipe(draft.imagePreview);
            }),
          ),
      })),
      {
        enabled: IS_DEV_MODE,
        name: 'sdkChatApp.global',
      },
    ),
  );
};
export type ClientStore = ReturnType<typeof createGlobalStore>;
