import { useWorkflowNode } from '@coze-workflow/base';

/**
 * Get the database ID selected by the database node
 * Returns the current database ID
 */
export function useCurrentDatabaseID() {
  const { data } = useWorkflowNode();
  const databaseList = data?.databaseInfoList ?? data?.inputs?.databaseInfoList;
  return databaseList?.[0]?.databaseInfoID;
}
