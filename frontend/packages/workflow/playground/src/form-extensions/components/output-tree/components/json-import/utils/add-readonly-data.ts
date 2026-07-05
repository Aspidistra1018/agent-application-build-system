import type { TreeNodeCustomData } from '../../custom-tree-node/type';

/**
 * Supplementary readonly metas
 */
export const addReadOnlyData = (params: {
  treeData: TreeNodeCustomData[];
  data: TreeNodeCustomData[];
  isBatch: boolean;
}): TreeNodeCustomData[] => {
  const { treeData, data, isBatch } = params;
  // Batch added to data [0] .children
  if (isBatch) {
    const readonlyMetas = treeData?.[0].children?.filter(d => d.readonly);
    if (readonlyMetas?.length) {
      const [one, ...rest] = data;
      return [
        {
          ...one,
          children: [
            ...(one.children ?? []),
            ...readonlyMetas,
          ] as TreeNodeCustomData[],
        },
        ...rest,
      ];
    }
    // Single processing data
  } else {
    const readonlyMetas = treeData?.filter(d => d.readonly);
    if (readonlyMetas?.length) {
      return [...data, ...readonlyMetas];
    }
  }
  return data;
};
