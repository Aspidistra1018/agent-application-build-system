import { type Chunk } from '@/text-knowledge-editor/types/chunk';

/**
 * Update document sharding content
 */
export const updateChunkContent = (chunk: Chunk, content: string): Chunk => ({
  ...chunk,
  content,
});

/**
 * Update chunks
 */
export const updateChunks = (chunks: Chunk[], chunk: Chunk): Chunk[] =>
  chunks.map(c => (c.slice_id === chunk.slice_id ? chunk : c));

/**
 * Get active sharding
 */
export const getActiveChunk = (
  chunks: Chunk[],
  activeChunkId: string | undefined,
) => {
  if (!activeChunkId) {
    return undefined;
  }
  return chunks.find(chunk => chunk.slice_id === activeChunkId) || undefined;
};

/**
 * Process the HTML content output by the editor
 * Remove unnecessary outer < p > tags to maintain the original content format
 */
export const processEditorContent = (content: string): string => {
  if (!content) {
    return '';
  }

  // If the content is wrapped with < p > tags, and there is only one < p > tag
  const singleParagraphMatch = content.match(/^<p>(.*?)<\/p>$/s);
  if (singleParagraphMatch) {
    return singleParagraphMatch[1];
  }

  return content;
};
