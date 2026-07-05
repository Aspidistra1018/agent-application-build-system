import { useQueryFieldIDs } from './use-query-field-ids';

// Currently, if the query field is empty, the sorting field is not displayed
export function useOrderByVisible() {
  const queryFieldIDs = useQueryFieldIDs();

  return queryFieldIDs.length > 0;
}
