import { nanoid } from 'nanoid';
import { traverse, type TraverseContext } from '@coze-workflow/base';

import type { TreeNodeCustomData } from '../../custom-tree-node/type';

/** Compute Path */
const getTreePath = (context: TraverseContext): string => {
  const parents = context
    .getParents()
    .filter(
      node =>
        typeof node.value === 'object' &&
        typeof node.value.name !== 'undefined' &&
        typeof node.value.type !== 'undefined',
    );
  return parents.map(node => node.value.name).join('/');
};

/** Old and new data keep keys to prevent variable system references from invalidating */
export const mergeData = (params: {
  newData: TreeNodeCustomData[];
  oldData: TreeNodeCustomData[];
  withRequired: boolean;
}): TreeNodeCustomData[] => {
  const { newData, oldData, withRequired } = params;

  // Compute the mapping of paths and keys in old data
  const treeDataPathKeyMap = new Map<string, string>();
  traverse(oldData, context => {
    if (
      typeof context.node.value !== 'object' ||
      typeof context.node.value.key === 'undefined' ||
      typeof context.node.value.type === 'undefined'
    ) {
      return;
    }
    const stringifyPath = getTreePath(context);
    treeDataPathKeyMap.set(stringifyPath, context.node.value.key);
  });

  // The new data reuses the key of the old data, and if it fails, it is regenerated.
  const valueWithRequired = !withRequired
    ? newData
    : traverse(newData, context => {
        if (
          typeof context.node.value !== 'object' ||
          typeof context.node.value.type === 'undefined'
        ) {
          return;
        }
        const stringifyPath = getTreePath(context);
        const key = treeDataPathKeyMap.get(stringifyPath) || nanoid();
        context.node.value.key = key;
        context.node.value.required = true;
      });

  return valueWithRequired;
};
