import {
  ValidateTrigger,
  type FormMetaV2,
} from '@flowgram-adapter/free-layout-editor';
import { type InputValueVO } from '@coze-workflow/base';

import { fireNodeTitleChange } from '@/nodes-v2/materials/fire-node-title-change';
import { createValueExpressionInputValidate } from '@/nodes-v2/materials/create-value-expression-input-validate';

import { transformOnSubmit } from '../transform-on-submit';
import { createTransformOnInit } from '../transform-on-init';
import { provideNodeOutputVariablesEffect } from '../../materials/provide-node-output-variables';
import FormRender from './form-render';
import { DEFAULT_CONVERSATION_VALUE, DEFAULT_OUTPUTS } from './constants';

interface FormData {
  inputParameters: InputValueVO[];
}

export const CREATE_CONVERSATION_FORM_META: FormMetaV2<FormData> = {
  // Node form rendering
  render: () => <FormRender />,

  // verification trigger timing
  validateTrigger: ValidateTrigger.onChange,

  // validation rules
  validate: {
    // Required
    'inputParameters.0.input': createValueExpressionInputValidate({
      required: true,
    }),
  },

  // Side effect management
  effect: {
    nodeMeta: fireNodeTitleChange,
    outputs: provideNodeOutputVariablesEffect,
  },

  // Node Backend Data - > Frontend Form Data
  formatOnInit: createTransformOnInit(
    DEFAULT_CONVERSATION_VALUE,
    DEFAULT_OUTPUTS,
  ),

  // Front-end form data - > node back-end data
  formatOnSubmit: transformOnSubmit,
};
