import { uniq } from 'lodash-es';
/**
 * Sort in the order in which the class id first appears
 */
export const getModelClassSortList = (classIdList: string[]) =>
  uniq(classIdList);
