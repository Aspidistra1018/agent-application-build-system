/**
 * Gets which other workflows or bots are referenced by the current workflow
 * At present, bots has no data, only workflow.
 */
import {
  useQuery,
  type RefetchOptions,
  type QueryObserverResult,
} from '@tanstack/react-query';
import { type Workflow } from '@coze-workflow/base/api';

import { useWorkflowOperation } from './use-workflow-operation';
import { useGlobalState } from './use-global-state';

interface WorkflowReferences {
  workflowList: Workflow[];
}

export const useWorkflowReferences = (): {
  references: WorkflowReferences | undefined;
  refetchReferences: (options?: RefetchOptions | undefined) => Promise<
    QueryObserverResult<
      {
        workflowList: Workflow[];
      },
      Error
    >
  >;
} => {
  const { spaceId, workflowId } = useGlobalState();

  const operation = useWorkflowOperation();

  const getWorkflowReferences = async () => {
    const workflowList = await operation.getReference();

    return { workflowList };
  };

  const { data, refetch } = useQuery({
    queryKey: ['workflow_references', spaceId, workflowId],
    queryFn: getWorkflowReferences,
  });

  return {
    references: data,
    refetchReferences: refetch,
  };
};
