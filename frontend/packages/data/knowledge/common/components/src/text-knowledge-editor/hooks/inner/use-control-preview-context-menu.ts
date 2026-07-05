import { useState, useRef, useEffect } from 'react';

import { type Chunk } from '@/text-knowledge-editor/types/chunk';

export const useControlPreviewContextMenu = () => {
  const [contextMenuInfo, setContextMenuInfo] = useState<{
    x: number;
    y: number;
    chunk: Chunk;
  } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Handling right-click events
  const openContextMenu = (e: React.MouseEvent, chunk: Chunk) => {
    e.preventDefault();
    setContextMenuInfo({
      x: e.clientX,
      y: e.clientY,
      chunk,
    });
  };

  // Close the right-click menu
  const closeContextMenu = () => {
    setContextMenuInfo(null);
  };

  // Click elsewhere in the document to close the right-click menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        closeContextMenu();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    contextMenuInfo,
    contextMenuRef,
    openContextMenu,
    closeContextMenu,
  };
};
