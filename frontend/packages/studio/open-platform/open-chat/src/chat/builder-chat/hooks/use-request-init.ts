import { useCallback, useRef } from 'react';

import { type CozeAPI } from '@coze/api';

import { type OpenRequestInit } from '@/types/props';

import { type IBuilderChatProps } from '../type';
import { combineAppDataWithProps, getBotInfo } from '../services/get-bot-info';
import { createOrGetConversation } from '../services/create-conversation';
import { useSetAppDataFromOnLine } from '../context/builder-chat-context';

// conversationId、sectionId 重新修改
export const useRequestInit = (props: IBuilderChatProps) => {
  const refProps = useRef(props);
  refProps.current = props;
  const setAppDataFromOnLine = useSetAppDataFromOnLine();

  const openRequestInit = useCallback(
    async (apiSdk?: CozeAPI): Promise<OpenRequestInit> => {
      const getBotInfoPrm = getBotInfo(apiSdk || undefined, refProps.current);
      const createOrGetConversationPrm = createOrGetConversation(
        apiSdk || undefined,
        refProps.current,
      );
      const botInfo = await getBotInfoPrm;
      const conversationInfo = await createOrGetConversationPrm;

      setAppDataFromOnLine?.(botInfo || null);
      const formatAPPInfo = combineAppDataWithProps(botInfo, refProps.current);
      return {
        ...formatAPPInfo,
        ...conversationInfo,
        isCustomBackground: !!formatAPPInfo.customBgInfo?.imgUrl,
        isBuilderChat: true,
      };
    },
    [],
  );
  return openRequestInit;
};
