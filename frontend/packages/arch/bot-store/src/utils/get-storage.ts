import { type StateStorage } from 'zustand/middleware';
import { throttle } from 'lodash-es';
import localForage from 'localforage';

const instance = localForage.createInstance({
  name: 'botStudio',
  storeName: 'botStudio',
});

const throttleTime = 1000;

/**
 * Get stored data persistence engine
 */
export const getStorage = (): StateStorage => {
  const persistStorage: StateStorage = {
    getItem: async (name: string) => await instance.getItem(name),
    setItem: throttle(async (name: string, value: unknown): Promise<void> => {
      await instance.setItem(name, value);
    }, throttleTime),
    removeItem: async (name: string) => {
      await instance.removeItem(name);
    },
  };

  return persistStorage;
};

/** @Deprecated - problem with persistence scheme, deprecated */
export const clearStorage = instance.clear;
