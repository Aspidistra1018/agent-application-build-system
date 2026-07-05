import { type ReactNode } from 'react';

export interface ChatHeaderProps {
  title: string;
  iconUrl?: string;
  extra?: ReactNode | false;
  theme?: 'bg-theme' | 'light';
  isNeedTitle?: boolean;
  isNeedLogo?: boolean;
  isNeedClearMessage?: boolean;
  isFixTop?: boolean;
  isShowConversations?: boolean;
  isShowHeader?: boolean;
}
