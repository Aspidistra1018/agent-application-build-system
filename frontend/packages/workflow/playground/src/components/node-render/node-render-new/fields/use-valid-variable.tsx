import {
  useCurrentEntity,
  useService,
} from '@flowgram-adapter/free-layout-editor';
import { WorkflowVariableFacadeService } from '@coze-workflow/variable';

/**
 * Get the variable and verify the scope of the variable
 * @param keyPath
 * @returns
 */
export function useValidVariable(keyPath?: string[]) {
  const node = useCurrentEntity();
  const facadeService: WorkflowVariableFacadeService = useService(
    WorkflowVariableFacadeService,
  );

  const valid = !!facadeService.getVariableFacadeByKeyPath(keyPath, {
    node,
    checkScope: true,
  });
  const variable = facadeService.getVariableFacadeByKeyPath(keyPath, { node });

  return {
    valid,
    variable,
  };
}
