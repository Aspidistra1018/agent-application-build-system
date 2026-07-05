import { useCallback, useRef, useEffect } from 'react';

import { type Chunk } from '@/text-knowledge-editor/types/chunk';
import { useDeleteChunk } from '@/text-knowledge-editor/hooks/inner/use-delete-chunk';

interface UseDeleteActionProps {
  chunks: Chunk[];
  onChunksChange?: (params: { chunks: Chunk[]; targetChunk: Chunk }) => void;
}

/**
 * Remove sharding hook
 *
 * Provides the ability to remove specific shardings
 */
export const useDeleteAction = ({
  chunks,
  onChunksChange,
}: UseDeleteActionProps) => {
  // Use ref to save the latest chunks reference
  const chunksRef = useRef<Chunk[]>(chunks);
  const { deleteSlice } = useDeleteChunk();

  // Every time props.chunks is updated, update the ref.
  useEffect(() => {
    chunksRef.current = chunks;
  }, [chunks]);

  /**
   * Remove specific shardings
   */
  const handleDeleteChunk = useCallback(
    (chunk: Chunk) => {
      // Get the latest chunks from the ref
      const currentChunks = chunksRef.current;
      const updatedChunks = currentChunks.filter(
        c =>
          c.text_knowledge_editor_chunk_uuid !==
          chunk.text_knowledge_editor_chunk_uuid,
      );
      if (!chunk.slice_id) {
        return;
      }
      deleteSlice(chunk.slice_id).then(() => {
        onChunksChange?.({
          chunks: updatedChunks,
          targetChunk: chunk,
        });
      });
    },
    [onChunksChange, deleteSlice],
  );

  return {
    deleteChunk: handleDeleteChunk,
  };
};
