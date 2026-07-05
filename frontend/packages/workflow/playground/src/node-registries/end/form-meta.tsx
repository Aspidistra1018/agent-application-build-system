import { get } from 'lodash-es';
import {
  ValidateTrigger,
  type FormMetaV2,
} from '@flowgram-adapter/free-layout-editor';

import { nodeMetaValidate } from '@/nodes-v2/materials/node-meta-validate';
import { createAnswerContentValidator } from '@/node-registries/common/validators';
import { fireNodeTitleChange } from '@/node-registries/common/effects';

import { createInputsValidator } from '../common/fields';
import { type FormData, TerminatePlan } from './types';
import { FormRender } from './form';
import { transformOnInit, transformOnSubmit } from './data-transformer';
export const END_FORM_META: FormMetaV2<FormData> = {
  // Node form rendering
  render: () => <FormRender />,

  // verification trigger timing
  validateTrigger: ValidateTrigger.onChange,

  // validation rules
  validate: {
    nodeMeta: nodeMetaValidate,
    ...createInputsValidator(true),
    ['inputs.content']: createAnswerContentValidator({
      fieldEnabled: ({ formValues }) => {
        const terminatePlan = get(formValues, 'inputs.terminatePlan');
        return terminatePlan === TerminatePlan.UseAnswerContent;
      },
    }),
  },

  // Side effect management
  effect: {
    nodeMeta: fireNodeTitleChange,
  },

  // Node Backend Data - > Frontend Form Data
  formatOnInit: transformOnInit,

  // Front-end form data - > node back-end data
  formatOnSubmit: transformOnSubmit,
};
