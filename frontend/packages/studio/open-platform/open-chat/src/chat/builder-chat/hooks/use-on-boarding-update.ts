import { useUpdateEffect } from 'ahooks';
import { useChatArea } from '@coze-common/chat-area';

import { useGetAppDataCombineWithProps } from '../context/builder-chat-context';

// conversationId、sectionId 重新修改
export const useOnboardingUpdate = () => {
  const { partialUpdateOnboardingData } = useChatArea();
  const appInfoResult = useGetAppDataCombineWithProps();

  useUpdateEffect(() => {
    partialUpdateOnboardingData(
      appInfoResult?.prologue,
      appInfoResult?.onboardingSuggestions,
    );
  }, [appInfoResult?.prologue, appInfoResult?.onboardingSuggestions]);
};
