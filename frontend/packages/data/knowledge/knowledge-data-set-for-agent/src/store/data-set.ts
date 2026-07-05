import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { type Dataset } from '@coze-arch/idl/knowledge';

interface DatasetStore {
  dataSetList: Dataset[];
  setDataSetList: (dataSetList: Dataset[]) => void;
}

/**
 * Only works in bot single agent mode
 */
export const useDatasetStore = create<DatasetStore>()(
  devtools(
    set => ({
      dataSetList: [],

      setDataSetList: (dataSetList: Dataset[]) => {
        set({ dataSetList }, false, 'setDataSetList');
      },
    }),
    {
      name: 'Coze.Agent.Dataset',
      enabled: IS_DEV_MODE,
    },
  ),
);
