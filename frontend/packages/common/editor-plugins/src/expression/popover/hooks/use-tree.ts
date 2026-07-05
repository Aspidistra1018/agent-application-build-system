import { useState, useEffect, type MutableRefObject } from 'react';

import { type Tree } from '@coze-arch/bot-semi';

import { generateUniqueId, getSearchValue, useLatest } from '../../shared';
import { type ExpressionEditorTreeNode } from '../../core';
import { type CompletionContext } from './types';

// Force the Tree component to re-render after the data update
function useTreeRefresh(filteredVariableTree: ExpressionEditorTreeNode[]) {
  const [treeRefreshKey, setTreeRefreshKey] = useState('');

  useEffect(() => {
    setTreeRefreshKey(generateUniqueId());
  }, [filteredVariableTree]);

  return treeRefreshKey;
}

// Search after the Tree component is re-rendered
// eslint-disable-next-line max-params
function useTreeSearch(
  treeRefreshKey: string,
  treeRef: MutableRefObject<Tree | null>,
  context: CompletionContext | undefined,
  callback: () => void,
) {
  const contextRef = useLatest(context);

  useEffect(() => {
    if (treeRef.current && contextRef.current) {
      const searchValue = getSearchValue(contextRef.current.textBefore);
      treeRef.current.search(searchValue);
      callback();
    }
  }, [treeRefreshKey, context]);
}

export { useTreeRefresh, useTreeSearch };
