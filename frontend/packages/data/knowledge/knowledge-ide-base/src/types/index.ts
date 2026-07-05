import { type DocumentStatus } from '@coze-arch/bot-api/knowledge';

export interface ProgressItem {
  status: DocumentStatus;
  progress: number;
}
export type ProgressMap = Record<string, ProgressItem>;

export enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
}

export enum FilterPhotoType {
  /**
   * all
   */
  All = 'All',
  /**
   * marked
   */
  HasCaption = 'HasCaption',
  /**
   * unmarked
   */
  NoCaption = 'NoCaption',
}
