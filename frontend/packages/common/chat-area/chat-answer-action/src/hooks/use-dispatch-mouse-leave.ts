import { type RefObject, useEffect } from 'react';

/**
 * Click the like and step on the button to close the reason for opening and fill in the panel.
 * When the fill panel is closed, a Reflow will be caused. At this time, the position of the like and step buttons will change, and the mouse is no longer on the button, but the corresponding button element will not penalize the mouseleave event.
 * Because the mouseleave is not triggered, the tooltip on the button does not disappear, misplaced, etc.
 * So you need to patch a mouseleave event when the panel changes visible
 */
export const useDispatchMouseLeave = (
  ref: RefObject<HTMLDivElement>,
  isFrownUponPanelVisible: boolean,
) => {
  useEffect(() => {
    ref.current?.dispatchEvent(
      new MouseEvent('mouseleave', {
        view: window,
        bubbles: true,
        cancelable: true,
      }),
    );
  }, [isFrownUponPanelVisible, ref.current]);
};
