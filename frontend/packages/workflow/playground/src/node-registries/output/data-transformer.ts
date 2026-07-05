import { type FormData, type NodeDataDTO } from './types';
import { get, set } from 'lodash-es';
import { VariableTypeDTO } from '@coze-workflow/base';

/**
 * Node Backend Data - > Frontend Form Data
 */
export const transformOnInit = (value: NodeDataDTO) => {
  const finalValue = {
    ...value,
    inputs: {
      ...value?.inputs,
      content: get(value, 'inputs.content.value.content') as string | undefined,
    },
  };
  // Set the initial value of each field
  if (typeof finalValue.inputs.inputParameters === 'undefined') {
    set(finalValue, 'inputs.inputParameters', [{ name: 'output' }]);
  }
  return finalValue;
};

/**
 * Front-end form data - > node back-end data
 * @param value
 * @returns
 */
export const transformOnSubmit = (value: FormData) => {
  return {
    ...value,
    inputs: {
      ...value.inputs,
      content: {
        type: VariableTypeDTO.string,
        value: {
          type: 'literal',
          content: value.inputs.content,
        },
      },
    },
  };
};
