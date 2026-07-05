import { useState, useRef, useCallback } from 'react';

import { useMemoizedFn } from 'ahooks';

interface Config {
  default?: number;
  min?: number;
  max?: number;
}

/**
 * Currently only highly variable is supported
 */
export const useResize = (config: Config) => {
  const [dragging, setDragging] = useState(false);
  const [height, setHeight] = useState(config.default);
  const ref = useRef<HTMLDivElement>(null);
  /**
   * Dragging process
   */
  const resizing = useRef(false);
  /**
   * Y-axis variation
   */
  const startY = useRef(0);
  /** starting position */
  const start = useRef(0);

  const handleMouseMove = useMemoizedFn(e => {
    if (resizing.current) {
      const newHeight = start.current - (e.clientY - startY.current); // Calculate the new height
      if (config.max && newHeight > config.max) {
        setHeight(config.max);
      } else if (config.min && newHeight < config.min) {
        setHeight(config.min);
      } else {
        setHeight(newHeight);
      }
    }
  });
  const handleMouseUp = useCallback(() => {
    resizing.current = false;
    setDragging(false);
    document.removeEventListener('mousemove', handleMouseMove); // Cancel listening
    document.removeEventListener('mouseup', handleMouseUp); // Cancel listening
  }, [handleMouseMove]);

  const handleMouseDown = useMemoizedFn(e => {
    resizing.current = true;
    setDragging(true);
    startY.current = e.clientY; // Record the Y-axis coordinates when the mouse starts dragging
    start.current = ref.current?.offsetHeight || 0;
    document.addEventListener('mousemove', handleMouseMove); // Monitor mouse movement events
    document.addEventListener('mouseup', handleMouseUp); // Monitor mouse lift events
  });

  return {
    height,
    bind: handleMouseDown,
    ref,
    dragging,
  };
};
