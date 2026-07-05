import { type ReactNode, createContext, type FC, useContext } from 'react';

import { useStoreWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

import { type ClientStateAction, type ClientStore } from './global';

export const GlobalStoreContext = createContext<{
  globalStore: ClientStore;
  // @ts-expect-error -- linter-disable-autofix
}>(undefined);

export const GlobalStoreProvider: FC<{
  children: ReactNode;
  globalStore: ClientStore;
}> = ({ children, globalStore }) => (
  <GlobalStoreContext.Provider
    value={{
      globalStore,
    }}
  >
    {children}
  </GlobalStoreContext.Provider>
);

export const useGlobalStore: <T>(
  selector: (store: ClientStateAction) => T,
) => T = selector => {
  const store = useContext(GlobalStoreContext).globalStore;
  return useStoreWithEqualityFn(store, selector, shallow);
};
