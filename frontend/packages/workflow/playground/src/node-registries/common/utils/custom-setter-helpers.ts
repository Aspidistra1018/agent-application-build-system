import { isNil } from 'lodash-es';
import { variableUtils } from '@coze-workflow/variable';
import { type ApiNodeDetailDTO } from '@coze-workflow/nodes';
import {
  ValueExpressionType,
  type ValueExpression,
  ViewVariableType,
} from '@coze-workflow/base';

/**
 * Get the value of a custom setter
 * @param value
 * @param field
 * @returns
 */
export const getCustomVal = (
  value: ValueExpression,
  // Extracting the type of a single input item by number
  field: ApiNodeDetailDTO['inputs'][number],
) => {
  if (!field?.type) {
    return undefined;
  }

  if (value.type === ValueExpressionType.REF || value.content === undefined) {
    return undefined;
  }
  const fieldType = variableUtils.DTOTypeToViewType(field.type, {
    arrayItemType: field.schema?.type,
    assistType: field.schema?.assistType,
  });

  if ([ViewVariableType.Number, ViewVariableType.Integer].includes(fieldType)) {
    return Number(value.content);
  }

  if (ViewVariableType.Boolean === fieldType) {
    return Boolean(value.content) || value.content !== 'false';
  }

  return value.content;
};

/**
 * Get the properties of the custom setter according to the plugin extension protocol
 */
export const getCustomSetterProps = (
  input: ApiNodeDetailDTO['inputs'][number],
) => {
  const {
    minimum,
    maximum,
    exclusiveMinimum,
    exclusiveMaximum,
    bizExtend,
    enum: inputEnum,
    enumVarNames,
    defaultValue,
  } = input || {};

  const isEnum = !!inputEnum;
  const isSlider = !isNil(minimum) && !isNil(maximum);

  // For example, this plugin: cutout: store/plugin/7438917083918024738
  if (isEnum) {
    return {
      key: 'Select',
      optionList: inputEnum.map((item, index) => ({
        value: item,
        label: enumVarNames?.[index] || `${item}`,
      })),
      defaultValue,
    };
  }

  // For example, this plugin: change: store/plugin/7438921446090637312
  if (isSlider) {
    let step = 1;
    try {
      step = JSON.parse(bizExtend || '{}').step;
    } catch {
      return undefined;
    }
    const min = exclusiveMinimum ? minimum + step : minimum;
    const max = exclusiveMaximum ? maximum - step : maximum;
    return {
      key: 'Slider',
      min,
      max,
      step,
      defaultValue: defaultValue || min,
    };
  }
};
