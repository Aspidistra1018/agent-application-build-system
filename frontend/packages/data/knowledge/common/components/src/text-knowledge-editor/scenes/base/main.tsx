import { useCallback, useEffect, useState } from 'react';

import { useSaveChunk } from '@/text-knowledge-editor/hooks/use-case/use-save-chunk';
import { useInitEditor } from '@/text-knowledge-editor/hooks/use-case/use-init-editor';
import { useEventListener } from '@/text-knowledge-editor/event';

import { DocumentPreview } from '../../features/preview';
import { DocumentEditor } from '../../features/editor';
import { type DocumentChunk } from './types/base-document';
import { previewContextMenuItemsContributes } from './preview-context-menu-items-contributes';
import { hoverEditBarActionsContributes } from './hover-edit-bar-actions-contributes';
import { editorContextActionRegistry } from './editor-context-actions-contributes';
export interface BaseTextKnowledgeEditorProps {
  chunks: DocumentChunk[];
  documentId: string;
  readonly?: boolean;
  onChange?: (chunks: DocumentChunk[]) => void;
  onAddChunk?: (chunk: DocumentChunk) => void;
  onDeleteChunk?: (chunk: DocumentChunk) => void;
}

export const BaseTextKnowledgeEditor = ({
  chunks: initialChunks,
  documentId,
  readonly = false,
  onChange,
  onAddChunk,
  onDeleteChunk,
}: BaseTextKnowledgeEditorProps) => {
  const [chunks, setChunks] = useState<DocumentChunk[]>(initialChunks);
  const [activeChunk, setActiveChunk] = useState<DocumentChunk | null>(null);

  // Using the core editor functions
  const { editor } = useInitEditor({
    chunk: activeChunk,
  });

  // Exit the new sharding feature
  const { saveChunk } = useSaveChunk({
    chunks,
    documentId,
    onChunksChange: newChunks => {
      onChange?.(newChunks);
      setActiveChunk(null);
    },
    onAddChunk,
    onDeleteChunk,
  });

  // Monitor right-click menu events
  useEventListener(
    'previewContextMenuItemAction',
    useCallback(
      ({ type, newChunk, chunks: newChunks, targetChunk }) => {
        if (type === 'add-after') {
          newChunk && setActiveChunk(newChunk);
          newChunks && setChunks(newChunks);
        }
        if (type === 'add-before') {
          newChunk && setActiveChunk(newChunk);
          newChunks && setChunks(newChunks);
        }
        if (type === 'delete') {
          onDeleteChunk?.(targetChunk);
          newChunks && onChange?.(newChunks);
        }
        if (type === 'edit') {
          setActiveChunk(targetChunk);
        }
      },
      [onDeleteChunk, onChange],
    ),
  );

  // Monitor floating edit bar events
  useEventListener(
    'hoverEditBarAction',
    useCallback(
      ({ type, targetChunk, chunks: newChunks, newChunk }) => {
        if (type === 'add-after') {
          newChunk && setActiveChunk(newChunk);
          newChunks && setChunks(newChunks);
        }
        if (type === 'add-before') {
          newChunk && setActiveChunk(newChunk);
          newChunks && setChunks(newChunks);
        }
        if (type === 'delete') {
          onDeleteChunk?.(targetChunk);
          newChunks && onChange?.(newChunks);
        }
        if (type === 'edit') {
          setActiveChunk(targetChunk);
        }
      },
      [onDeleteChunk, onChange],
    ),
  );

  useEffect(() => {
    setChunks(initialChunks);
  }, [initialChunks]);

  return (
    <>
      {chunks.map(chunk => (
        <div key={chunk.text_knowledge_editor_chunk_uuid}>
          {(() => {
            if (
              chunk.text_knowledge_editor_chunk_uuid ===
                activeChunk?.text_knowledge_editor_chunk_uuid &&
              activeChunk
            ) {
              return (
                <DocumentEditor
                  editor={editor}
                  editorContextMenuItemsRegistry={editorContextActionRegistry}
                  onBlur={content => {
                    saveChunk({
                      ...activeChunk,
                      content,
                    });
                  }}
                />
              );
            }
            return (
              <DocumentPreview
                chunk={chunk}
                chunks={chunks}
                readonly={readonly}
                onActivateEditMode={setActiveChunk}
                hoverEditBarActionsRegistry={hoverEditBarActionsContributes}
                previewContextMenuItemsRegistry={
                  previewContextMenuItemsContributes
                }
              />
            );
          })()}
        </div>
      ))}
    </>
  );
};
