import { type ReactNode } from 'react';

export enum ProcessStatus {
  Processing, // Processing
  Complete, // Processing complete
  Failed, // Processing failed
}
export interface ProcessProgressItemProps {
  className?: string | undefined;
  style?: React.CSSProperties;
  mainText: string;
  subText: ReactNode;
  percent: number;
  status: ProcessStatus;
  actions?: Array<ReactNode>;
  avatar: ReactNode;
  tipText?: ReactNode;
  percentFormat?: ReactNode;
}
