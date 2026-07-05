import { ViewVariableType } from '@coze-workflow/base';

export const GROUP_NAME_PREFIX = 'Group';

export const MATCHED_VARIABLE_TYPES: ViewVariableType[][] = [
  [ViewVariableType.Number, ViewVariableType.Integer],
];

/**
 * Maximum number of group names
 */
export const MAX_GROUP_NAME_COUNT = 20;
/**
 * Maximum number of groups
 */
export const MAX_GROUP_COUNT = 50;
/**
 * Maximum number of grouped variables
 */
export const MAX_GROUP_VARIABLE_COUNT = 50;
