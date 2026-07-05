export {
  /** @Deprecated This usage method is deprecated, please use the method exported by @code-arch/foundation-sdk in the future*/
  useSpaceStore,
  /** @Deprecated This usage method is deprecated, please use the method exported by @code-arch/foundation-sdk in the future*/
  useSpace,
  /** @Deprecated This usage method is deprecated, please use the method exported by @code-arch/foundation-sdk in the future*/
  useSpaceList,
} from '@coze-foundation/space-store';

export { useAuthStore } from './auth';

/** @Deprecated - problem with persistence scheme, deprecated */
export { clearStorage } from './utils/get-storage';

export { useSpaceGrayStore, TccKey } from './space-gray';
