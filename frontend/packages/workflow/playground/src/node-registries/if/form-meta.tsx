import { flatten } from 'lodash-es';
import {
  ValidateTrigger,
  type FormMetaV2,
} from '@flowgram-adapter/free-layout-editor';

import { nodeMetaValidate } from '@/nodes-v2/materials/node-meta-validate';
import {
  fireNodeTitleChange,
  provideNodeOutputVariablesEffect,
} from '@/node-registries/common/effects';
import { validateAllBranches } from '@/form-extensions/setters/condition/multi-condition/validate/validate';

import { type FormData } from './types';
import { FormRender } from './form';
import { transformOnInit, transformOnSubmit } from './data-transformer';
import { CONDITION_PATH } from './constants';

export const IF_FORM_META: FormMetaV2<FormData> = {
  // Node form rendering
  render: () => <FormRender />,

  // verification trigger timing
  validateTrigger: ValidateTrigger.onChange,

  // validation rules
  validate: {
    nodeMeta: nodeMetaValidate,
    [CONDITION_PATH]: ({ value, context }) => {
      const { node, playgroundContext } = context;

      const res = validateAllBranches(value, node, playgroundContext);

      const msg = flatten(res).reduce((previousValue, currentValue) => {
        let _previousValue = previousValue;
        if (currentValue?.left?.message) {
          _previousValue = _previousValue
            ? `${_previousValue};${currentValue?.left?.message}`
            : currentValue?.left?.message;
        }

        if (currentValue?.operator?.message) {
          _previousValue = _previousValue
            ? `${_previousValue};${currentValue?.operator?.message}`
            : currentValue?.operator?.message;
        }

        if (currentValue?.right?.message) {
          _previousValue = _previousValue
            ? `${_previousValue};${currentValue?.right?.message}`
            : currentValue?.right?.message;
        }

        return _previousValue;
      }, '');

      return msg ? msg : undefined;
    },
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
