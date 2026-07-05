import { type MergeGroup } from '../types';
import { GROUP_NAME_PREFIX } from '../constants';

/**
 * Generate variable group name
 */
export function generateGroupName(mergeGroups: MergeGroup[] | undefined) {
  const groups: MergeGroup[] = mergeGroups || [];

  const names = groups.map(mergeGroup => mergeGroup.name);

  let index = 1;
  let newTitle;

  while (true) {
    newTitle = `${GROUP_NAME_PREFIX}${index}`;
    if (!names.includes(newTitle)) {
      break;
    }
    index += 1;
  }
  return newTitle;
}
