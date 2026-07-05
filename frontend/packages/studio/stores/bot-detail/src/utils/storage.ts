import { useCollaborationStore } from '../store/collaboration';

export function createStorage<T extends object>(
  s: Storage,
  target: T,
  prefix = 'common_storage',
) {
  return new Proxy(target, {
    set: (_, prop: string, value) => {
      if (typeof value === 'string') {
        s.setItem(`${prefix}.${prop}`, value);
        return true;
      }
      return false;
    },
    get: (_, prop: string) => s.getItem(`${prefix}.${prop}`) ?? undefined,
    deleteProperty: (_, prop): boolean => {
      if (typeof prop === 'string') {
        s.removeItem(`${prefix}.${prop}`);
      }
      return true;
    },
  });
}
export const storageLocal = createStorage<Record<string, string | undefined>>(
  localStorage,
  {},
);

// NOTICE: Custom logic: baseVersion to get from bot_detail_store
export const storage = new Proxy(storageLocal, {
  get: (target, prop: string, receiver) => {
    if (prop === 'baseVersion') {
      return useCollaborationStore.getState().getBaseVersion();
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, ...rest) {
    if (prop === 'baseVersion') {
      console.error(
        'you should use botDetailStore instead of storage to keep base_commit_version',
      );
      return false;
    }
    return Reflect.set(target, prop, ...rest);
  },
});
