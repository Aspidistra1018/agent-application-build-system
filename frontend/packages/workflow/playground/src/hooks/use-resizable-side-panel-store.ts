import { persist, devtools } from 'zustand/middleware';
import { create } from 'zustand';

interface ResizableSidePanelStoreState {
  width: number;
}

interface ResizableSidePanelStoreActions {
  setWidth: (width: number) => void;
}

type ResizableSidePanelStore = ResizableSidePanelStoreState &
  ResizableSidePanelStoreActions;

const NAME = 'workflow-resizable-side-panel';

/**
 * Adjustable width side window state, requires persistence
 */
export const useResizableSidePanelStore = create<ResizableSidePanelStore>()(
  devtools(
    persist(
      set => ({
        width: 0,
        setWidth: width => set({ width }),
      }),
      {
        name: NAME,
      },
    ),
    {
      enabled: IS_DEV_MODE,
      name: NAME,
    },
  ),
);
