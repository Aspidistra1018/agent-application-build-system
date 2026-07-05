/**
 * To fulfill a miraculous function
 * In multi agent mode, replying.
 * The user switched agents manually
 * Regenerate the conversation based on the new agent
 * It is necessary to record that the switch of the agent is "manual" | "automatic"
 */

/**
 * !! Not mixed with Bot Details.
 */

import { devtools } from 'zustand/middleware';
import { create } from 'zustand';

export interface ManuallySwitchAgentState {
  agentId: string | null;
}

export interface ManuallySwitchAgentAction {
  recordAgentIdOnManuallySwitchAgent: (agentId: string) => void;
  clearAgentId: () => void;
}

export const useManuallySwitchAgentStore = create<
  ManuallySwitchAgentAction & ManuallySwitchAgentState
>()(
  devtools(
    set => ({
      agentId: null,
      recordAgentIdOnManuallySwitchAgent: agentId => {
        set({ agentId }, false, 'recordAgentIdOnManuallySwitchAgent');
      },
      clearAgentId: () => {
        set({ agentId: null }, false, 'clearAgentId');
      },
    }),
    { enabled: IS_DEV_MODE, name: 'botStudio.manuallySwitchAgentStore' },
  ),
);
