import { useState } from 'react';

import { type LevelDocumentTreeNode } from '../../types/level-document';

export interface ActiveChunkInfo {
  chunk: LevelDocumentTreeNode | null;
  renderLevel: string | null;
}

/**
 * Manage active chunks in documents
 * Use the renderLevel field to uniquely identify the render location of the chunk
 */
export const useActiveChunk = () => {
  // Store the active chunk and its renderLevel
  const [activeChunkInfo, setActiveChunkInfo] = useState<ActiveChunkInfo>({
    chunk: null,
    renderLevel: null,
  });

  /**
   * Clear active chunks
   */
  const clearActiveChunk = () => {
    setActiveChunkInfo({
      chunk: null,
      renderLevel: null,
    });
  };

  /**
   * Set the active chunk and its renderLevel
   * Use during user interaction (e.g. double-clicking)
   */
  const setActiveChunkWithLevel = (chunk: LevelDocumentTreeNode) => {
    if (!chunk.renderLevel) {
      console.warn('Chunk does not have renderLevel field', chunk);
      return;
    }

    setActiveChunkInfo({
      chunk,
      renderLevel: chunk.renderLevel,
    });
  };

  /**
   * Checks whether the given chunk is the currently active chunk
   */
  const isActiveChunk = (renderLevel: string | undefined) => {
    if (!renderLevel) {
      return false;
    }
    return renderLevel === activeChunkInfo.renderLevel;
  };

  return {
    activeChunkInfo,
    clearActiveChunk,
    setActiveChunkWithLevel,
    isActiveChunk,
  };
};
