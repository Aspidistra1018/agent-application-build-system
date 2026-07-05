import { useSyncExternalStore } from 'use-sync-external-store/shim';

import type { IExternalStore } from './external-store';

/**
 * Changes to the abstract registry with subscribe and getSnapshot methods, internally using useSyncExternalStore implementation
 */
export const useRegistryState = <T>(registry: IExternalStore<T>) => {
  const state = useSyncExternalStore(
    registry.subscribe,
    registry.getSnapshot,
    registry.getSnapshot,
  );
  return state;
};
