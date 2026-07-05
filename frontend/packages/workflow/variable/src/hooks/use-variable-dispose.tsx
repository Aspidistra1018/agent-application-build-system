import { useEffect } from 'react';

import {
  useCurrentEntity,
  useService,
} from '@flowgram-adapter/free-layout-editor';

import { WorkflowVariableService } from '../legacy';

interface HooksParams {
  keyPath?: string[];
  onDispose?: () => void;
}

/**
 * @Deprecated Variable Destruction Partial Bad Case
 * - After the global variable is destroyed due to the switch Project, the variable reference will be set empty, resulting in the invalidation of the variable reference
 */
export function useVariableDispose(params: HooksParams) {
  const { keyPath, onDispose } = params;

  const node = useCurrentEntity();
  const variableService: WorkflowVariableService = useService(
    WorkflowVariableService,
  );

  useEffect(() => {
    if (!keyPath) {
      return () => null;
    }

    const disposable = variableService.onListenVariableDispose(
      keyPath,
      () => {
        onDispose?.();
      },
      { node },
    );

    return () => disposable.dispose();
  }, [keyPath?.join('.')]);

  return;
}
