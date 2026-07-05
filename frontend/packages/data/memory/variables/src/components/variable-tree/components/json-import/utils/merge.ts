import { nanoid } from 'nanoid';

import type { TreeNodeCustomData } from '../../../type';
import { traverse, type TraverseContext } from './traverse';

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
  newData: TreeNodeCustomData;
  oldData: TreeNodeCustomData;
}): TreeNodeCustomData => {
  const { newData, oldData } = params;

  // Compute the mapping of paths and keys in old data
  const treeDataPathKeyMap = new Map<
    string,
    {
      key: string;
    }
  >();
  traverse(oldData, context => {
    if (
      typeof context.node.value !== 'object' ||
      typeof context.node.value.key === 'undefined' ||
      typeof context.node.value.type === 'undefined'
    ) {
      return;
    }
    const stringifyPath = getTreePath(context);
    treeDataPathKeyMap.set(stringifyPath, {
      key: context.node.value.key,
    });
  });

  // The new data reuses the key of the old data, and if it fails, it is regenerated.
  const newDataWithKey = traverse(newData, context => {
    if (
      typeof context.node.value !== 'object' ||
      typeof context.node.value.type === 'undefined'
    ) {
      return;
    }
    const stringifyPath = getTreePath(context);
    const { key } = treeDataPathKeyMap.get(stringifyPath) || {
      key: nanoid(),
    };
    context.node.value.key = key;
  });

  return newDataWithKey;
};
