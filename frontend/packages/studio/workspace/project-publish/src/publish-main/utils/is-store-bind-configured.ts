import { type StoreBindKey } from '@/store';

type SelfMapping<T extends string> = {
  [K in T]: K; // Key syntax: Mapping each literal type to itself
};

type KeyMapping = SelfMapping<StoreBindKey>;

export const isStoreBindConfigured = (
  config: Record<string, string>,
): boolean => {
  // Prevent StoreBindKey changes from causing bugs
  const { category_id, display_screen }: KeyMapping = {
    category_id: 'category_id',
    display_screen: 'display_screen',
  };
  return Boolean(config[category_id]) && Boolean(config[display_screen]);
};
