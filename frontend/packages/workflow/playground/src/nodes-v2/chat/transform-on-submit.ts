import omit from 'lodash-es/omit';
import { type NodeDataDTO, type InputValueVO } from '@coze-workflow/base';

interface FormData {
  inputParameters: InputValueVO[];
}

/**
 * Front-end form data - > node back-end data
 * @param value
 * @returns
 */
export const transformOnSubmit = (value: FormData): NodeDataDTO => {
  const formattedValue: Record<string, unknown> = {
    ...value,
    inputs: {
      inputParameters: value?.inputParameters || [],
    },
  };

  return omit(formattedValue, ['inputParameters']) as unknown as NodeDataDTO;
};
