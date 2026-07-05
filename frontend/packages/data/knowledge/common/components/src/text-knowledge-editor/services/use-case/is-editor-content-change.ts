import { type Chunk } from '@/text-knowledge-editor/types/chunk';

import { processEditorContent } from '../inner/document-editor.service';

/**
 * Determine whether the content has changed
 */
export const isEditorContentChange = (
  chunks: Chunk[],
  chunk: Chunk,
): boolean => {
  const newContent = processEditorContent(chunk.content ?? '');
  const oldContent = chunks.find(c => c.slice_id === chunk.slice_id)?.content;
  return newContent !== oldContent;
};
