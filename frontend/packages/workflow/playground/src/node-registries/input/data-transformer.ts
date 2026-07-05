import { variableUtils } from '@coze-workflow/variable';

import { type FormData, type NodeDataDTO } from './types';

/**
 * Front-end form data - > node back-end data
 * @param value
 * @returns
 */
export const transformOnSubmit = (value: FormData): NodeDataDTO =>
  ({
    ...value,
    inputs: {
      outputSchema: JSON.stringify(
        value.outputs?.map(o => variableUtils.viewMetaToDTOMeta(o)) || [],
      ),
    },
  } as unknown as NodeDataDTO);
