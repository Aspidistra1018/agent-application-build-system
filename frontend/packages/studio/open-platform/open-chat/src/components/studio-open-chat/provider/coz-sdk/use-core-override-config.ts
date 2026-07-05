import { useMemo } from 'react';

import { type CreateChatCoreOverrideConfig } from '@coze-common/chat-area';

import { useChatAppProps } from '../../store';
import { useCoreManager } from './use-core-manager';
import { type ChatProviderFunc } from './type';
import { useChatCozeSdk } from './context';

export const useCoreOverrideConfig = ({
  refChatFunc,
}: {
  refChatFunc?: React.MutableRefObject<ChatProviderFunc | undefined>;
}) => {
  const { chatConfig } = useChatAppProps();
  const { tokenManager } = useChatCozeSdk();
  const requestManagerOptions = useCoreManager({ refChatFunc });
  return useMemo(() => {
    const config: CreateChatCoreOverrideConfig = {
      env: 'thirdPart',
      biz: 'third_part',
      deployVersion: 'inhouse',
      requestManagerOptions,
      tokenManager,
    };

    return config;
  }, [chatConfig]);
};
