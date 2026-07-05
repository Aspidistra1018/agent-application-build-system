import { catchParse, catchStringify, STRINGIFY_ERROR } from './json-handle';

export enum LocalStorageKey {
  ChatHistory = 'ChatHistory',
  UID = 'OpenSDKUID',
}

export type StorageKey = `coze__${LocalStorageKey}__${string}`;

export const getStorageKey = (
  key: LocalStorageKey,
  suffix?: string,
): StorageKey => `coze__${key}__${suffix ?? ''}`;

export const setItem = (key: string, obj: unknown) => {
  const str = catchStringify(obj);
  if (str === STRINGIFY_ERROR) {
    return;
  }

  if (obj) {
    localStorage.setItem(key, str);
  } else {
    localStorage.removeItem(key);
  }
};

export const getItem = <T = unknown>(key: StorageKey, defaultValue: T) => {
  const str = localStorage.getItem(key);

  if (!str) {
    return defaultValue;
  }

  return catchParse<T>(str, defaultValue);
};

export const storageUtil = {
  setItem,
  getItem,
};
