import React from 'react';

import {
  ValidateTrigger,
  type FormMetaV2,
} from '@flowgram-adapter/free-layout-editor';
import { type InputValueVO } from '@coze-workflow/base';

import { fireNodeTitleChange } from '@/nodes-v2/materials/fire-node-title-change';
import { createValueExpressionInputValidate } from '@/nodes-v2/materials/create-value-expression-input-validate';

import { provideNodeOutputVariablesEffect } from '../materials/provide-node-output-variables';
import { transformOnSubmit } from './transform-on-submit';
import { createTransformOnInit } from './transform-on-init';
import { syncConversationNameEffect } from './sync-conversation-name-effect';

interface ChatFormData {
  inputParameters: InputValueVO[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const createFormMeta = ({
  fieldConfig,
  needSyncConversationName,
  defaultInputValue,
  defaultOutputValue,
  formRenderComponent,
  customValidators = {},
}): FormMetaV2<ChatFormData> => {
  // Define an uppercase variable reference component
  const FormRender = formRenderComponent;

  const formMeta = {
    // Node form rendering
    render: () => <FormRender />,

    // verification trigger timing
    validateTrigger: ValidateTrigger.onChange,

    // validation rules
    validate: {
      // Required
      'inputParameters.*.input': createValueExpressionInputValidate({
        required: ({ name }) => {
          const fieldName = name
            .replace('inputParameters.', '')
            .replace('.input', '');

          return Boolean(fieldConfig[fieldName]?.required);
        },
      }),
      ...customValidators,
    },

    // Side effect management
    effect: {
      nodeMeta: fireNodeTitleChange,
      outputs: provideNodeOutputVariablesEffect,
    },

    // Node Backend Data - > Frontend Form Data
    formatOnInit: createTransformOnInit(defaultInputValue, defaultOutputValue),

    // Front-end form data - > node back-end data
    formatOnSubmit: transformOnSubmit,
  };

  // Need to synchronize the value of CONVERSATION_NAME field
  if (needSyncConversationName) {
    Object.assign(formMeta.effect, {
      inputParameters: syncConversationNameEffect,
    });
  }

  return formMeta;
};
