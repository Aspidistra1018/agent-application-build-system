import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { type NodeResult, workflowApi } from '@coze-workflow/base/api';

import { typeSafeJSONParse } from '../../../utils';

interface Props {
  result: NodeResult;
  paging: number;
  spaceId: string;
  workflowId: string;
}

export default function useGetCurrentResult({
  result,
  paging,
  spaceId,
  workflowId,
}: Props) {
  const isNodeLogNeedAsync = true;
  const { batch, isBatch } = result || {};

  // Deserialize to get all iterated arrays
  const batchData: NodeResult[] = useMemo(() => {
    if (!isBatch) {
      return [];
    }
    const data = typeSafeJSONParse(batch);
    return (Array.isArray(data) ? data : []).map(i => {
      if (!i) {
        return i;
      }
      return {
        ...i,
        /** The tag is not included in the batch data, and it is added manually. */
        isBatch: true,
      };
    });
  }, [isBatch, batch]);

  // Current execution log (get full log synchronously)
  const current: NodeResult | undefined = useMemo(() => {
    if (!isBatch) {
      return result;
    }

    return batchData.find(i => i?.index === paging);
  }, [paging, isBatch, batchData, result]);

  const isUseAsyncNodeResult = () => {
    if (!isNodeLogNeedAsync) {
      return false;
    }

    if (!current) {
      return false;
    }

    if (!current.needAsync) {
      return false;
    }

    return true;
  };

  const { data: currentAsync } = useQuery({
    retry: 1,
    queryKey: [
      'WorkflowApiGetNodeExecuteHistory',
      workflowId,
      spaceId,
      current?.executeId,
      current?.nodeId,
      current?.NodeType,
      isBatch,
      paging,
    ],
    queryFn: () =>
      workflowApi
        .GetNodeExecuteHistory({
          workflow_id: workflowId,
          space_id: spaceId,
          execute_id: current?.executeId || '',
          node_id: current?.nodeId || '',
          node_type: current?.NodeType || '',
          is_batch: isBatch,
          batch_index: isBatch ? paging : undefined,
        })
        .then(res => res.data)
        .catch(() => current),
    enabled: isUseAsyncNodeResult(),
  });

  return {
    current: isUseAsyncNodeResult() ? currentAsync : current,
    batchData,
  };
}
