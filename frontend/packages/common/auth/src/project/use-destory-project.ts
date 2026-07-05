import { useEffect } from 'react';

import { useProjectAuthStore } from './store';

export function useDestoryProject(projectId: string) {
  const destorySpace = useProjectAuthStore(store => store.destory);

  return useEffect(
    () => () => {
      // When the space component is destroyed, empty the corresponding space data
      destorySpace(projectId);
    },
    [],
  );
}
