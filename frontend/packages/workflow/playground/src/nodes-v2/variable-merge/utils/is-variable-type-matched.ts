import { type ViewVariableType } from '@coze-workflow/base';

import { getMatchedVariableTypes } from './get-matched-variable-types';

/**
 * Does the variable type match?
 * @param viewType1
 * @param viewType2
 * @returns
 */
export function isVariableTypeMatched(
  viewType1: ViewVariableType,
  viewType2: ViewVariableType,
) {
  return getMatchedVariableTypes(viewType1).includes(viewType2);
}
