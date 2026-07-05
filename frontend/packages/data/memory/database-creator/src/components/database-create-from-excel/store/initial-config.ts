import { create } from 'zustand';
import { noop } from 'lodash-es';
import { type DatabaseInfo } from '@coze-studio/bot-detail-store';

export interface initialConfigStore {
  onCancel: () => void;
  botId: string;
  spaceId: string;
  maxColumnNum: number;
  onSave?: (params: {
    response: any;
    stateData: DatabaseInfo;
  }) => Promise<void>;
}

// Used to store static state, in non-initialization scenarios, read-only and not modifiable
export const useInitialConfigStore = create<initialConfigStore>()(set => ({
  onCancel: noop,
  botId: '',
  spaceId: '',
  maxColumnNum: 10,
}));
