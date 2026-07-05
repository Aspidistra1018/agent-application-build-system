import { useEffect } from 'react';

import { type StoreSet } from '../../context/chat-area-context/type';

/**
 * When destroying, remove an additional setScrollViewFarFromBottom, mainly for the coze home scene
 */
export const useResetToNewestTip = (storeSet: StoreSet) => {
  useEffect(
    () => () => {
      storeSet.useMessageIndexStore
        .getState()
        .setScrollViewFarFromBottom(false);
    },
    [],
  );
};
