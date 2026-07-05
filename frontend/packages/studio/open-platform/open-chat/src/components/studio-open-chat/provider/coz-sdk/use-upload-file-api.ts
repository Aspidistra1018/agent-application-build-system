import { useCallback } from 'react';

import { type UploadFileApi } from '@/helper';

import { useChatCozeSdk } from './context';
export const useUploadFileApi = (): UploadFileApi => {
  const { cozeApiSdk } = useChatCozeSdk();
  return useCallback(
    async ({ file }) => {
      const result = await cozeApiSdk?.files.upload({
        file,
      });

      return {
        uri: result?.id || '',
        url: '',
      };
    },
    [cozeApiSdk],
  );
};
