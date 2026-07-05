import { useState, useEffect } from 'react';

interface UseControlContextMenuProps {
  contextMenuRef: React.RefObject<HTMLDivElement>;
}

export const useControlContextMenu = ({
  contextMenuRef,
}: UseControlContextMenuProps) => {
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Handle right-click menus
  const openContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    // Calculate the position relative to the event target element
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    setContextMenuPosition({
      x: relativeX,
      y: relativeY,
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
