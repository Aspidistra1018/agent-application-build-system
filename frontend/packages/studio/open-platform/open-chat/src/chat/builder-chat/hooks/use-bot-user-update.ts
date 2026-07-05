import { useUpdateEffect } from 'ahooks';
import { useBotInfo, useChatArea } from '@coze-common/chat-area';

import { useGetAppDataCombineWithProps } from '../context/builder-chat-context';

// conversationId、sectionId 重新修改
export const useBotAndUserUpdate = () => {
  const { updateBotInfo } = useBotInfo();
  const { recordBotInfo } = useChatArea();
  const appInfoResult = useGetAppDataCombineWithProps();
  useUpdateEffect(() => {
    const id = appInfoResult?.botInfo?.id || '';
    recordBotInfo({
      name: appInfoResult?.botInfo?.nickname || '',
      avatar: appInfoResult?.botInfo?.url || '',
    });
    updateBotInfo(() => ({
      [id]: {
        url: appInfoResult?.botInfo?.url || '',
        nickname: appInfoResult?.botInfo?.nickname || '',
        id: appInfoResult?.botInfo?.id || '',
        allowMention: false,
      },
    }));
  }, [
    appInfoResult?.botInfo?.nickname,
    appInfoResult?.botInfo?.url,
    appInfoResult?.botInfo?.id,
  ]);
};
