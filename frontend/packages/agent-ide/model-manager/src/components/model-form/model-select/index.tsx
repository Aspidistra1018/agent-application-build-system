import React, { type CSSProperties } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { type Model } from '@coze-arch/bot-api/developer_api';
import { useBotDetailIsReadonly } from '@coze-studio/bot-detail-store';
import { useBotEditor } from '@coze-agent-ide/bot-editor-context-store';

import { UIModelSelect } from './ui-model-select';

const getModelOptionList = ({
  onlineModelList,
  offlineModelMap,
  currentModelId,
}: {
  onlineModelList: Model[];
  offlineModelMap: Record<string, Model>;
  currentModelId: string | undefined;
}) => {
  if (!currentModelId) {
    return onlineModelList;
  }
  const specialModel = offlineModelMap[currentModelId];
  if (!specialModel) {
    return onlineModelList;
  }
  return onlineModelList.concat([specialModel]);
};

export interface ModelSelectProps {
  className?: string;
  style?: CSSProperties;
  value: string | undefined;
  onChange: (value: string) => void;
}

export const ModelSelect: React.FC<ModelSelectProps> = ({
  value,
  ...restProps
}) => {
  const {
    storeSet: { useModelStore },
  } = useBotEditor();
  const { onlineModelList, offlineModelMap } = useModelStore(
    useShallow(state => ({
      onlineModelList: state.onlineModelList,
      offlineModelMap: state.offlineModelMap,
    })),
  );

  const isReadonly = useBotDetailIsReadonly();

  // After the user switches from the special model to the normal model, the list of options will change, so the user can never switch back
  const modelList = getModelOptionList({
    onlineModelList,
    offlineModelMap,
    currentModelId: value,
  });

  return (
    <UIModelSelect
      modelList={modelList}
      disabled={isReadonly}
      value={value}
      {...restProps}
    />
  );
};
