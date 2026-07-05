import { devtools } from 'zustand/middleware';
import { create } from 'zustand';

interface BotModeStore {
  isCollaboration: boolean;
}

interface BotModeAction {
  setIsCollaboration: (isCollaboration: boolean) => void;
}

export const initialStore: BotModeStore = {
  isCollaboration: false,
};

//TODO is subsequently changed to context or migrated to the package.
export const useBotModeStore = create<BotModeStore & BotModeAction>()(
  devtools(
    (set, get) => ({
      ...initialStore,
      reset: () => {
        set(initialStore);
      },
      setIsCollaboration: isCollaboration => {
        set({ isCollaboration });
      },
    }),
    {
      enabled: IS_DEV_MODE,
      name: 'botStudio.botMode',
    },
  ),
);
