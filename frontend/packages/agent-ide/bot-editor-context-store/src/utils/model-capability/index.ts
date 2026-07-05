import {
  type Model,
  ModelFuncConfigType,
  ModelFuncConfigStatus,
} from '@coze-arch/bot-api/developer_api';

export type ModelCapabilityConfig = {
  [key in ModelFuncConfigType]: [
    configStatus: ModelFuncConfigStatus,
    modelName: string,
  ];
};

export type TGetModelCapabilityConfig = (params: {
  modelIds: string[];
  getModelById: (id: string) => Model | undefined;
}) => ModelCapabilityConfig;

// Fallback of model capability configuration, capability without configuration is handled as supported
export const defaultModelCapConfig = Object.values(ModelFuncConfigType).reduce(
  (res, type) => ({
    ...res,
    [type]: [
      ModelFuncConfigStatus.FullSupport,
      '',
    ] satisfies ModelCapabilityConfig[ModelFuncConfigType],
  }),
  {},
) as ModelCapabilityConfig;

export const mergeModelFuncConfigStatus = (
  ...values: ModelFuncConfigStatus[]
) => Math.max(...values);

const mergeModelCapabilityConfig = (
  src: ModelCapabilityConfig,
  target: Model['func_config'],
  targetName: string,
) =>
  target
    ? Object.entries(target).reduce<ModelCapabilityConfig>(
        (merged, [key, status]) => {
          // Unconfigured capabilities are considered fully supported
          const [preStatus, preName] = merged[
            key as unknown as ModelFuncConfigType
          ] ?? [ModelFuncConfigStatus.FullSupport, []];
          const mergedStatus = mergeModelFuncConfigStatus(preStatus, status);
          return {
            ...merged,
            [key]: [
              mergedStatus,
              mergedStatus === preStatus ? preName : targetName,
            ],
          };
        },
        src,
      )
    : src;

export const getMultiAgentModelCapabilityConfig: TGetModelCapabilityConfig = ({
  getModelById,
  modelIds,
}) =>
  Array.from(modelIds).reduce((res, modelId) => {
    const model = getModelById(modelId);
    if (model?.func_config) {
      return mergeModelCapabilityConfig(
        res,
        model.func_config,
        model.name ?? '',
      );
    }
    return res;
  }, defaultModelCapConfig);

export const getSingleAgentModelCapabilityConfig: TGetModelCapabilityConfig = ({
  getModelById,
  modelIds,
}) => {
  const model = getModelById(modelIds.at(0) ?? '');
  return mergeModelCapabilityConfig(
    defaultModelCapConfig,
    model?.func_config,
    model?.name ?? '',
  );
};
