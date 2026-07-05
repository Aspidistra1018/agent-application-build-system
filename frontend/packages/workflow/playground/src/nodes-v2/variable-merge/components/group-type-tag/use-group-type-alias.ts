import { useCurrentEntity } from '@flowgram-adapter/free-layout-editor';
import { type WorkflowVariableService } from '@coze-workflow/variable';

import { useVariableService } from '@/hooks';

import { getGroupTypeAlias } from '../../utils/get-group-type-alias';
import { type MergeGroup } from '../../types';

/**
 * Get group type alias
 */
export function useGroupTypeAlias(mergeGroup: MergeGroup) {
  const variableService: WorkflowVariableService = useVariableService();
  const node = useCurrentEntity();

  return getGroupTypeAlias(mergeGroup, variableService, node);
}
