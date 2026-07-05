import { useState } from 'react';

export const useHoverEffect = () => {
  const [hoveredChunk, setHoveredChunk] = useState<string | null>(null);

  // Handling mouse hover events
  const handleMouseEnter = (chunkId: string) => {
    setHoveredChunk(chunkId);
  };

  // Handling mouse away events
  const handleMouseLeave = () => {
    setHoveredChunk(null);
  };

  return {
    hoveredChunk,
    handleMouseEnter,
    handleMouseLeave,
  };
};
