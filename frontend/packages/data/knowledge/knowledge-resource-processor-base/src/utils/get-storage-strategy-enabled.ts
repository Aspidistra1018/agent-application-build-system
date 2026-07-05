import { type Dataset, StorageLocation } from '@coze-arch/idl/knowledge';

export function getStorageStrategyEnabled(dataset?: Dataset) {
  return (
    // Cloud search is only available in the domestic environment
    IS_CN_REGION &&
    // Cloud search can only be configured if the knowledge base is uploaded for the first time.
    dataset?.doc_count === 0 &&
    dataset?.storage_location === StorageLocation.Default
  );
}
