import type { DataField, Form, GeneralField } from '@formily/core';
import { I18n, type I18nKeysNoOptionsType } from '@coze-arch/i18n';
import {
  ModelStyle,
  type ModelParameter,
} from '@coze-arch/bot-api/developer_api';

import { type FormilyCoreType } from '../context/formily-context/type';

interface FieldInitStrategy {
  execute: (parameter: ModelParameter, formilyCore: FormilyCoreType) => void;
}

/**
 * Switch to "Custom" mode when the user modifies the model "Generate Diversity" parameter
 */
class CustomModelStyleStrategy implements FieldInitStrategy {
  handler: (_field: DataField, form: Form) => void = (_field, form) =>
    form.setValues({ model_style: ModelStyle.Custom });

  execute: FieldInitStrategy['execute'] = (
    param,
    { onFieldInputValueChange },
  ) => {
    if (param.param_class?.class_id === 1) {
      onFieldInputValueChange(param.name, this.handler);
    }
  };
}

function isDataField(field: GeneralField): field is DataField {
  return Object.prototype.hasOwnProperty.call(field, 'value');
}

/**
 * When a field value is less than the threshold, use field.feedbacks to display prompt text
 * https://core.formilyjs.org/zh-CN/api/models/field#ifieldfeedback
 */
class MinimumValueStrategy implements FieldInitStrategy {
  constructor(
    private name: string,
    private min: number,
    private i18nKey: I18nKeysNoOptionsType,
  ) {}

  validator: (field: GeneralField, _form: Form) => void = (field, _form) => {
    if (isDataField(field)) {
      field.setSelfWarnings(
        (field.value ?? 0) < this.min ? [I18n.t(this.i18nKey)] : undefined,
      );
    }
  };

  execute: FieldInitStrategy['execute'] = (
    param,
    { onFieldInit, onFieldValueChange },
  ) => {
    if (param.name === this.name) {
      onFieldInit(this.name, this.validator);
      onFieldValueChange(this.name, this.validator);
    }
  };
}

export const fieldInitStrategies = [
  new CustomModelStyleStrategy(),
  // When the repeated sentence penalty is < 0, the prompt copy is displayed
  new MinimumValueStrategy('frequency_penalty', 0, 'model_setting_alert'),
  // When the maximum reply length is < 100, the prompt copy is displayed
  new MinimumValueStrategy('max_tokens', 100, 'model_setting_alert_2'),
];
