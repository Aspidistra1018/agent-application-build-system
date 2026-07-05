import { devtools } from 'zustand/middleware';
import { create } from 'zustand';

interface SignMobileStore {
  /** Has the logo ever popped up? */
  mobileTips: boolean;
}

interface SignMobileAction {
  setMobileTips: (tipsFlag: boolean) => void;
}

export const useSignMobileStore = create<SignMobileStore & SignMobileAction>()(
  devtools(
    set => ({
      mobileTips: false,
      setMobileTips: flag => {
        set({ mobileTips: flag });
      },
    }),
    {
      enabled: IS_DEV_MODE,
      name: 'botStudio.signMobile',
    },
  ),
);
