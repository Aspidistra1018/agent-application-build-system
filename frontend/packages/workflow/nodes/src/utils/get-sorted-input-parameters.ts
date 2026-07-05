import { groupBy, sortBy } from 'lodash-es';
import { type DTODefine } from '@coze-workflow/base';

export type InputVariableDTO = DTODefine.InputVariableDTO;

/**
 * Sort the input parameters, then group them by required fields, and put the required fields at the front
 * @param inputs
 * @param groupKey
 * @param sortKey
 * @returns
 */
export const getSortedInputParameters = <
  T extends { name?: string; required?: boolean },
>(
  inputs: T[],
  groupKey = 'required',
  sortKey = 'name',
): T[] => {
  const processedItems = (inputs || []).map(item => ({
    ...item,
    required: item.required !== undefined ? item.required : false, // Default setting is false
  }));

  // Group by required attributes first
  const grouped = groupBy(processedItems, groupKey);

  // Sort by name attribute within each group
  const sortedTrueGroup = sortBy(grouped.true, sortKey) || [];
  const sortedFalseGroup = sortBy(grouped.false, sortKey) || [];

  // Merge true and false groupings
  const mergedArray = [...sortedTrueGroup, ...sortedFalseGroup];

  return mergedArray;
};
