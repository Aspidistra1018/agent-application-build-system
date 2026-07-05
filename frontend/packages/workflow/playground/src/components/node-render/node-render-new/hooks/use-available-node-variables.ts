import { useEffect, startTransition } from 'react';

import type { FlowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import { useRefresh } from '@flowgram-adapter/free-layout-editor';
import { FlowNodeVariableData } from '@coze-workflow/variable';

import { useVariableService } from '@/hooks';

/**
 * Get the variable service and listen for variable changes to ensure re-rendering
 */
export function useAvailableNodeVariables(node: FlowNodeEntity) {
  const refresh = useRefresh();
  const variableService = useVariableService();

  useEffect(() => {
    const disposable = node
      .getData(FlowNodeVariableData)
      .public.available.onDataChange(() => startTransition(() => refresh()));
    return () => {
      disposable?.dispose();
    };
  }, []);

  return variableService;
}
