import { traverse } from '@/utils/traverse';
import { type Variable, type VariableGroup } from '@/store';

import { type TreeNodeCustomData } from './type';

interface RootFindResult {
  isRoot: true;
  data: TreeNodeCustomData;
  parentData: null;
}
interface ChildrenFindResult {
  isRoot: false;
  parentData: TreeNodeCustomData;
  data: TreeNodeCustomData;
}

export type FindDataResult = RootFindResult | ChildrenFindResult | null;
/**
 * According to the target array, find the value and position of the key in the item, mainly to obtain the position, which is convenient for operating the children of the parent.
 */
export function findCustomTreeNodeDataResult(
  target: Array<TreeNodeCustomData>,
  variableId: string,
): FindDataResult {
  const dataInRoot = target.find(item => item.variableId === variableId);
  if (dataInRoot) {
    // If it is the root node
    return {
      isRoot: true,
      parentData: null,
      data: dataInRoot,
    };
  }
  function findDataInChildrenLoop(
    customChildren: Array<TreeNodeCustomData>,
    parentData?: TreeNodeCustomData,
  ): FindDataResult {
    function findDataLoop(
      customData: TreeNodeCustomData,
      _parentData: TreeNodeCustomData,
    ): FindDataResult {
      if (customData.variableId === variableId) {
        return {
          isRoot: false,
          parentData: _parentData,
          data: customData,
        };
      }
      if (customData.children && customData.children.length > 0) {
        return findDataInChildrenLoop(
          customData.children as Array<TreeNodeCustomData>,
          customData,
        );
      }
      return null;
    }
    for (const child of customChildren) {
      const childResult = findDataLoop(child, parentData || child);
      if (childResult) {
        return childResult;
      }
    }
    return null;
  }
  return findDataInChildrenLoop(target);
}

// Flatten groupVariableMeta to viewVariableTreeNode []
export function flatGroupVariableMeta(
  groupVariableMeta: VariableGroup[],
  maxDepth = Infinity,
) {
  const res: Variable[] = [];
  traverse(
    groupVariableMeta,
    item => {
      res.push(...item.varInfoList);
    },
    'subGroupList',
    maxDepth,
  );
  return res;
}
export const flatVariableTreeData = (treeData: Variable[]) => {
  const res: Variable[] = [];
  traverse(
    treeData,
    item => {
      res.push(item);
    },
    'children',
  );
  return res;
};
