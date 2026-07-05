import { useState, useLayoutEffect, useRef } from 'react';

export function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // Function to define the updated size
    const updateSize = () => {
      setWidth(ref.current ? ref.current.offsetWidth : 0);
    };

    // Create a ResizeObserver instance and observe the target element
    const observer = new ResizeObserver(updateSize);
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Update the size once when the component is loaded
    updateSize();

    // cleanup function
    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  return { ref, width };
}
