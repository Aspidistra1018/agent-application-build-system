import { useEffect } from 'react';

import { createLocateChunkId } from '../../services/locate-segment';

/**
 * Scroll to the selected element
 * @Param selectionIDs array of selected element IDs
 */
export const useScrollToSelection = (selectionIDs?: string[]) => {
  useEffect(() => {
    if (selectionIDs?.length) {
      const firstSelectedId = selectionIDs[0];
      const element = document.getElementById(
        createLocateChunkId(firstSelectedId),
      );
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectionIDs]);
};
