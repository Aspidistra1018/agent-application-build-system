import { type ViewVariableType } from '@coze-workflow/base';

import { MATCHED_VARIABLE_TYPES } from '../constants';

/**
 * Get the matching type
 * @param viewType
 * @returns
 */
export function getMatchedVariableTypes(
  viewType: ViewVariableType | undefined,
) {
  if (!viewType) {
    return [];
  }
  return (
    MATCHED_VARIABLE_TYPES.find(types => types.includes(viewType)) || [viewType]
  );
}
