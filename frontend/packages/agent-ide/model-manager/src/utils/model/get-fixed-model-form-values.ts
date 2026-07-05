import { cloneDeep } from 'lodash-es';
import {
  ModelParamType,
  type ModelParameter,
} from '@coze-arch/bot-api/developer_api';
import { convertModelValueType } from '@coze-agent-ide/bot-editor-context-store';

export const getFixedModelFormValues = (
  values: Record<string, unknown>,
  modelParameterList: ModelParameter[],
) => {
  const draft = cloneDeep(values);

  Object.keys(draft).forEach(key => {
    const targetParameter = modelParameterList.find(
      parameter => parameter.name === key,
    );
    if (!targetParameter) {
      return;
    }
    const value = draft[key];
    const parameterType = targetParameter.type;
    const { options } = targetParameter;

    // Fixed that parameters of type enumeration are not in the scope of enumeration
    // IDL cannot write paradigm, converted to string comparison
    if (options?.length) {
      if (options.findIndex(option => option.value === String(value)) >= 0) {
        return;
      }
      draft[key] = convertModelValueType(
        options.at(0)?.value ?? '',
        parameterType,
      );
    }

    // Fixed number type parameters exceeding maximum and minimum values
    if (
      parameterType === ModelParamType.Float ||
      parameterType === ModelParamType.Int
    ) {
      if (typeof value !== 'number') {
        return;
      }

      const { max, min } = targetParameter;

      const numberedMax = Number(max);
      const numberedMin = Number(min);
      if (max && value > numberedMax) {
        draft[key] = numberedMax;
      }
      if (min && value < numberedMin) {
        draft[key] = numberedMin;
      }
    }
  });
  return draft;
};
