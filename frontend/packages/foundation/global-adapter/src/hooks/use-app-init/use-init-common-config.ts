/**
 * @File open source version does not support background configuration for future expansion
 */
import { useEffect } from 'react';

import { useCommonConfigStore } from '@coze-foundation/global-store';

export const useInitCommonConfig = () => {
  const setInitialized = useCommonConfigStore(state => state.setInitialized);

  useEffect(() => {
    setInitialized();
  }, []);
};
