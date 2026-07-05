/**
 * Add the display hidden state of the node panel on the left, which needs to be consumed elsewhere, so it is abstracted into a global state.
 */

import { create } from 'zustand';

interface AddNodeVisibleStore {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useAddNodeVisibleStore = create<AddNodeVisibleStore>(set => ({
  visible: true,
  setVisible: visible => set({ visible }),
}));
