import { useState } from 'react';

import { useShowBackGround } from '../public/use-show-bgackground';

interface UseBackgroundScrollReturnType {
  onReachTop: () => void;
  onLeaveTop: () => void;
  beforeClassName: string;
  beforeNode: JSX.Element | null;
  maskClassName: string;
  showGradient: boolean;
}

// In background cover mode scrollView adds the following processing:
// 1. When there is a top Node, add it after scrolling, a layer of fixed height black gradual change div, the page scrolls down without stiffness
// 2. Add a layer of mask to the dialogue area, the bottom conversation area gradually changes and disappears, and the bottom of the conversation element is not stiff
export const useBackgroundScroll = ({
  hasHeaderNode,
  maskNode,
  styles,
}: {
  hasHeaderNode?: boolean;
  maskNode: JSX.Element;
  styles: Record<string, string>;
}): UseBackgroundScrollReturnType => {
  const [showGradient, setShowGradient] = useState(true);
  const showBackground = useShowBackGround();

  return {
    onReachTop: () => setShowGradient(false),
    onLeaveTop: () => setShowGradient(true),
    beforeClassName: showBackground ? 'absolute left-0' : '',
    beforeNode:
      showGradient && hasHeaderNode && showBackground ? maskNode : null,
    // Add mask, deal with the bottom of the chat session without gradual change blunt problem
    maskClassName: showBackground ? styles['scroll-mask'] ?? '' : '',
    showGradient,
  };
};
