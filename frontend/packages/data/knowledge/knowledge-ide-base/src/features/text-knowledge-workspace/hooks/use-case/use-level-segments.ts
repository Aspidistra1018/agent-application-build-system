import { useState, useMemo, useEffect } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { useKnowledgeStore } from '@coze-data/knowledge-stores';
import { type ILevelSegment } from '@coze-data/knowledge-stores';
import { useTosContent } from '@coze-data/knowledge-common-hooks';
import { withTitle } from '@coze-data/knowledge-common-components/text-knowledge-editor/scenes/level';
import { ChunkType, type DocumentInfo } from '@coze-arch/bot-api/knowledge';

import { createLevelDocumentChunkByLevelSegment } from '../../utils/document-utils';

interface UseLevelSegmentsParams {
  curDoc?: DocumentInfo;
}

/**
 * Hooks for processing hierarchical segmented data
 */
export const useLevelSegments = ({ curDoc }: UseLevelSegmentsParams) => {
  // Scroll selected for hierarchical segmentation
  const [selectionIDs, setSelectionIDs] = useState<string[]>([]);

  const { levelSegments, setLevelSegments } = useKnowledgeStore(
    useShallow(state => ({
      levelSegments: state.levelSegments,
      setLevelSegments: state.setLevelSegments,
    })),
  );

  // Get a list of hierarchical segments and slices
  const { content: treeContent, loading: tosLoading } = useTosContent(
    curDoc?.chunk_strategy?.chunk_type === ChunkType.LevelChunk
      ? curDoc?.doc_tree_tos_url
      : undefined,
  );

  // Use useMemo to cache hierarchical segmented data after conversion
  const renderLevelSegmentsData = useMemo(
    () =>
      levelSegments.map(item => createLevelDocumentChunkByLevelSegment(item)),
    [levelSegments],
  );

  // Handling hierarchy segmentation changes
  const handleLevelSegmentsChange = (chunks: ILevelSegment[]) => {
    setLevelSegments(chunks);
  };

  // Handling deletion of hierarchical segmentation
  const handleLevelSegmentDelete = (chunk: ILevelSegment) => {
    setLevelSegments(
      levelSegments.filter(item => item.slice_id !== chunk.slice_id),
    );
  };

  // Load hierarchical segmentation during initialization
  useEffect(() => {
    setLevelSegments(withTitle(treeContent?.chunks ?? [], curDoc?.name ?? ''));
  }, [treeContent]);

  return {
    levelSegments,
    renderLevelSegmentsData,
    selectionIDs,
    setSelectionIDs,
    tosLoading,
    handleLevelSegmentsChange,
    handleLevelSegmentDelete,
  };
};
