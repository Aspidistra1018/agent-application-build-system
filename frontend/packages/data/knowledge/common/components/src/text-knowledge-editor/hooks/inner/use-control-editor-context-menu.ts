import { useState, useEffect } from 'react';

interface UseControlEditorContextMenuProps {
  contextMenuRef: React.RefObject<HTMLDivElement>;
}

export const useControlEditorContextMenu = ({
  contextMenuRef,
}: UseControlEditorContextMenuProps) => {
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Handle right-click menus
  const openContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Close the right-click menu
  const closeContextMenu = () => {
    setContextMenuPosition(null);
  };

  // Process Click Document Other Locations
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If you click outside the right-click menu, close the menu
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
    contextMenuPosition,
    openContextMenu,
    closeContextMenu,
  };
};
