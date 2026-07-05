import { useIDEGlobalStore } from '../context';

export const useCommitVersion = () => {
  // Built-in shallow operation, no useShallow
  // eslint-disable-next-line @coze-arch/zustand/prefer-shallow
  const { version, patch } = useIDEGlobalStore(store => ({
    version: store.version,
    patch: store.patch,
  }));

  return {
    version,
    patch,
  };
};
