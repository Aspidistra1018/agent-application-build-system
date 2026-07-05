import { I18n } from '@coze-arch/i18n';
import {
  ValidateTrigger,
  type FormMetaV2,
} from '@flowgram-adapter/free-layout-editor';

import { provideNodeOutputVariablesEffect } from '@/nodes-v2/materials/provide-node-output-variables';
import { fireNodeTitleChange } from '@/nodes-v2/materials/fire-node-title-change';
import { createValueExpressionInputValidate } from '@/nodes-v2/materials/create-value-expression-input-validate';

import type { FormData } from './types';
import FormRender from './form';
import { transformOnInit, transformOnSubmit } from './data-transformer';

const INPUT_PARAMETERS_FIELD_NAME = 'inputParameters.*.name';

export const VARIABLE_NODE_FORM_META: FormMetaV2<FormData> = {
  // Node form rendering
  render: () => <FormRender />,

  // verification trigger timing
  validateTrigger: ValidateTrigger.onChange,

  // validation rules
  validate: {
    [INPUT_PARAMETERS_FIELD_NAME]: ({ value }) => {
      if (/^.+$/.test(value)) {
        return undefined;
      }
      return I18n.t('bot_edit_variable_field_required_error');
    },
    'inputParameters.*.input': createValueExpressionInputValidate({
      required: true,
    }),
  },

  // Side effect management
  effect: {
    nodeMeta: fireNodeTitleChange,
    outputs: provideNodeOutputVariablesEffect,
  },

  // Node Backend Data - > Frontend Form Data
  formatOnInit: transformOnInit,

  // Front-end form data - > node back-end data
  formatOnSubmit: transformOnSubmit,
};
