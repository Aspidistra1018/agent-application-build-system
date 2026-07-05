import { useEffect } from 'react';

import { useSpaceAuthStore } from './store';

export function useDestorySpace(spaceId: string) {
  const destorySpace = useSpaceAuthStore(store => store.destory);

  return useEffect(
    () => () => {
      // When the space component is destroyed, empty the corresponding space data
      destorySpace(spaceId);
    },
    [],
  );
}
