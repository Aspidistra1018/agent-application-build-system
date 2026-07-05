import React, {
  useContext,
  createContext,
  type ReactNode,
  useRef,
  type FC,
} from 'react';

import { type TokenManager } from '@coze-common/chat-core';
import { type CozeAPI } from '@coze/api';

import { useApiClient } from './use-api-client';

interface ContextValue {
  cozeApiSdk: CozeAPI;
  tokenManager: TokenManager;
  refreshToken?: () => Promise<string>;
  refMessageListLeft?: React.RefObject<Record<string, unknown>>;
}
// @ts-expect-error: 先不检查
export const ChatCozeSdkContext = createContext<ContextValue>({});
export const ChatCozeSdkProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const refMessageListLeft = useRef<Record<string, unknown>>({});
  const { tokenManagerClient, cozeApiClient, refreshToken } = useApiClient();

  return (
    <ChatCozeSdkContext.Provider
      value={{
        cozeApiSdk: cozeApiClient,
        tokenManager: tokenManagerClient,
        refMessageListLeft,
        refreshToken,
      }}
    >
      {children}
    </ChatCozeSdkContext.Provider>
  );
};

export const useChatCozeSdk = (): ContextValue => {
  const { cozeApiSdk, tokenManager, refMessageListLeft, refreshToken } =
    useContext(ChatCozeSdkContext);
  return {
    cozeApiSdk,
    tokenManager,
    refMessageListLeft,
    refreshToken,
  };
};
