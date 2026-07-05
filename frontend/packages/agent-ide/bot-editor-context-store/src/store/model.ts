import { shallow } from 'zustand/vanilla/shallow';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { create } from 'zustand';
import { type Model } from '@coze-arch/bot-api/developer_api';

import { getModelById } from '../utils/model/get-model-by-id';
import { type ModelPresetValues } from './type';
import { getModelPresetValues } from './helpers/get-model-preset-values';

export interface ModelState {
  // List of all valid models in the current environment
  onlineModelList: Model[];
  /* Special models that do not belong to the current environment key === modelId
   * For example: select the GPT model in cn-inhouse, then switch to cn-release, the current bot model list = normal model list + 1 special model (GPT)
   * In MultiAgent mode, each Agent model list = normal model list + 1 special model (may exist)
   * After switching from the special model to the normal model, it is not allowed to switch back to the special model
   */
  offlineModelMap: Record<string, Model>;
  // Pure computational properties, calculated from specialModel and baseModel key === modelId
  // key === modelId
  modelPresetValuesMap: Record<string, ModelPresetValues>;
}

export interface ModelAction {
  setOnlineModelList: (modelList: Model[]) => void;
  setOfflineModelMap: (map: Record<string, Model>) => void;
  getModelById: (id: string) => Model | undefined;
  setModelPresetValuesMap: (map: Record<string, ModelPresetValues>) => void;
  getModelPreset: (id: string) => ModelPresetValues | undefined;
}

export const createModelStore = () => {
  const store = create<ModelState & ModelAction>()(
    devtools(
      subscribeWithSelector((set, get) => ({
        onlineModelList: [],
        offlineModelMap: {},
        modelPresetValuesMap: {},
        setOnlineModelList: onlineModelList =>
          set({ onlineModelList }, false, 'setOnlineModelList'),
        setOfflineModelMap: map =>
          set({ offlineModelMap: map }, false, 'setOfflineModelMap'),

        getModelById: id => {
          const { onlineModelList, offlineModelMap } = get();
          return getModelById({ onlineModelList, offlineModelMap, id });
        },
        setModelPresetValuesMap: map => {
          set({ modelPresetValuesMap: map }, false, 'setModelPresetValuesMap');
        },
        getModelPreset: id => get().modelPresetValuesMap[id],
      })),
      {
        enabled: IS_DEV_MODE,
        name: 'botStudio.botEditor.model',
      },
    ),
  );
  const unSubscribe = store.subscribe(
    state => ({
      onlineModelList: state.onlineModelList,
      offlineModelMap: state.offlineModelMap,
    }),
    ({ onlineModelList, offlineModelMap }) => {
      const presetValuesMap: Record<string, ModelPresetValues> = {};

      onlineModelList.forEach(model => {
        const { model_params } = model;
        if (!model_params?.length) {
          return;
        }
        const modelId = String(model.model_type);

        presetValuesMap[modelId] = getModelPresetValues({ model_params });
      });

      Object.keys(offlineModelMap).forEach(modelId => {
        const modelParams = offlineModelMap[modelId]?.model_params;
        if (!modelParams?.length) {
          return;
        }
        presetValuesMap[modelId] = getModelPresetValues({
          model_params: modelParams,
        });
      });

      store.getState().setModelPresetValuesMap(presetValuesMap);
    },
    {
      equalityFn: shallow,
    },
  );
  return { useModelStore: store, unSubscribe };
};

export type ModelStore = ReturnType<typeof createModelStore>['useModelStore'];
