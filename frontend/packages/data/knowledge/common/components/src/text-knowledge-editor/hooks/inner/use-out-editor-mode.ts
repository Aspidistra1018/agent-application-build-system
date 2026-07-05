import { useEffect } from 'react';

export interface UseOutEditorModeProps {
  editorRef: React.RefObject<HTMLDivElement>;
  exclude?: React.RefObject<HTMLDivElement>[];
  onExitEditMode?: () => void;
}

export const useOutEditorMode = ({
  editorRef,
  exclude,
  onExitEditMode,
}: UseOutEditorModeProps) => {
  // Process Click Document Other Locations
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If you click outside the editor, exit editing mode
      if (
        editorRef.current &&
        !editorRef.current.contains(event.target as Node) &&
        !exclude?.some(ref => ref.current?.contains(event.target as Node))
      ) {
        onExitEditMode?.();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editorRef, exclude, onExitEditMode]);
};
