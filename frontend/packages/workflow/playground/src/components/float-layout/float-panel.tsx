import type React from 'react';
import { useEffect, useState, startTransition, useRef } from 'react';

import { type FloatLayoutPanel } from '../../services/workflow-float-layout-service';

interface FloatPanelProps {
  panel: FloatLayoutPanel;
}

export const FloatPanel: React.FC<FloatPanelProps> = ({ panel }) => {
  const nodeRef = useRef(panel.render());
  const [, setVersion] = useState(0);

  useEffect(() => {
    const dispose = panel.onUpdate(next => {
      /**
       * Click on the blank area to close the scene of SideSheet.
       *
       * Question:
       * - Closing SideSheet directly will cause the Blur event of the form in the drawer to not be triggered, and the UI will be destroyed first
       *
       * Solution ideas:
       * - UI updates need to be prioritized lower than form blur related data updates in the drawer
       *
       * Specific plan:
       * - Use start Transition to lower the priority of UI destruction this time, so that Blur-related data updates can be executed before the UI destruction of the drawer
       */
      startTransition(() => {
        nodeRef.current = next;
        setVersion(v => v + 1);
      });
    });
    return () => dispose.dispose();
  }, [panel]);

  return <>{nodeRef.current}</>;
};
