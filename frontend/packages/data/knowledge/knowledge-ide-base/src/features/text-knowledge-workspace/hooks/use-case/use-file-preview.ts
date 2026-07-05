import { useState, useEffect } from 'react';

export const useFilePreview = (curDocId: string) => {
  const [showOriginalFile, setShowOriginalFile] = useState(false);

  // Reset the preview state when switching documents
  useEffect(() => {
    if (showOriginalFile) {
      setShowOriginalFile(false);
    }
  }, [curDocId]);

  const handleToggleOriginalFile = (checked: boolean) => {
    setShowOriginalFile(checked);
  };

  return {
    showOriginalFile,
    handleToggleOriginalFile,
  };
};
