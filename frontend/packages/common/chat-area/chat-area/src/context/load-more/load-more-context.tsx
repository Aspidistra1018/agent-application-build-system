import { createContext, type PropsWithChildren } from 'react';

import {
  type LoadMoreClient,
  type LoadMoreClientMethod,
} from '../../service/load-more';

export const LoadMoreContext = createContext<{
  loadMoreClient: LoadMoreClientMethod | null;
}>({
  loadMoreClient: null,
});

/**
 * Anti-pattern takeoff
 */
export const LoadMoreProvider = (
  props: PropsWithChildren<{
    loadMoreClient: LoadMoreClient;
  }>,
) => {
  const { children, loadMoreClient } = props;
  return (
    <LoadMoreContext.Provider
      value={{
        loadMoreClient,
      }}
    >
      {children}
    </LoadMoreContext.Provider>
  );
};
