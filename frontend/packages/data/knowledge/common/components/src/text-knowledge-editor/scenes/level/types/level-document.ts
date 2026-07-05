import { type ILevelSegment } from '@coze-data/knowledge-stores';

import { type Chunk } from '@coze-data/knowledge-common-components/text-knowledge-editor';

export type LevelDocumentChunk = ILevelSegment & Chunk;

export type LevelDocumentTreeNode = Omit<ILevelSegment, 'children' | 'parent'> &
  Chunk & {
    parent?: string;
    children?: LevelDocumentTreeNode[];
    renderLevel?: string; // Rendering path used to uniquely identify chunks
  };

export type LevelDocumentTree = LevelDocumentTreeNode[];
