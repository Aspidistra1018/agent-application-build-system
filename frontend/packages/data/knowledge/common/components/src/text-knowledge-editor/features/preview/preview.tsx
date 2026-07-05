import React, { useRef } from 'react';

import classNames from 'classnames';

import { type Chunk } from '@/text-knowledge-editor/types/chunk';
import { useHoverEffect } from '@/text-knowledge-editor/hooks/inner/use-hover-effect';
import { useControlContextMenu } from '@/text-knowledge-editor/hooks/inner/use-control-context-menu';
import { DocumentChunkPreview } from '@/text-knowledge-editor/components/preview-chunk/document';

import { type PreviewContextMenuItemRegistry } from '../preview-context-menu-items/registry';
import PreviewContextMenu from '../preview-context-menu';
import { type HoverEditBarActionRegistry } from '../hover-edit-bar-actions/registry';
import { HoverEditBar } from '../hover-edit-bar';
interface DocumentPreviewProps {
  chunk: Chunk;
  chunks: Chunk[];
  readonly?: boolean;
  locateId?: string;
  hoverEditBarActionsRegistry: HoverEditBarActionRegistry;
  previewContextMenuItemsRegistry: PreviewContextMenuItemRegistry;
  onActivateEditMode?: (chunk: Chunk) => void;
}

const DocumentPreviewComponent: React.FC<DocumentPreviewProps> = props => {
  const {
    chunk,
    chunks,
    readonly = false,
    locateId,
    onActivateEditMode,
    hoverEditBarActionsRegistry,
    previewContextMenuItemsRegistry,
  } = props;
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const { hoveredChunk, handleMouseEnter, handleMouseLeave } = useHoverEffect();

  const { contextMenuPosition, openContextMenu } = useControlContextMenu({
    contextMenuRef,
  });

  return (
    <div className="relative">
      <div
        className={classNames(
          // layout
          'relative overflow-hidden',
        )}
        onContextMenu={readonly ? undefined : e => openContextMenu(e)}
        onMouseEnter={
          readonly
            ? undefined
            : () => handleMouseEnter(chunk.text_knowledge_editor_chunk_uuid)
        }
        onMouseLeave={readonly ? undefined : handleMouseLeave}
        onDoubleClick={readonly ? undefined : () => onActivateEditMode?.(chunk)}
      >
        {/* The action bar displayed when hovering */}
        {hoveredChunk === chunk.text_knowledge_editor_chunk_uuid &&
        !readonly ? (
          <HoverEditBar
            chunk={chunk}
            chunks={chunks}
            hoverEditBarActionsRegistry={hoverEditBarActionsRegistry}
          />
        ) : null}

        <DocumentChunkPreview chunk={chunk} locateId={locateId || ''} />
      </div>

      {/* right-click menu */}
      {contextMenuPosition ? (
        <PreviewContextMenu
          previewContextMenuItemsRegistry={previewContextMenuItemsRegistry}
          x={contextMenuPosition.x}
          y={contextMenuPosition.y}
          chunk={chunk}
          chunks={chunks}
          readonly={readonly}
          contextMenuRef={contextMenuRef}
        />
      ) : null}
    </div>
  );
};

// Wrap components with React.memo to avoid unnecessary re-rendering
export const DocumentPreview = React.memo(
  DocumentPreviewComponent,
  (prevProps, nextProps) => {
    // If the sharding content changes, it needs to be re-rendered
    if (prevProps.chunk.content !== nextProps.chunk.content) {
      return false;
    }

    // In other cases, no re-rendering is required
    return true;
  },
);
