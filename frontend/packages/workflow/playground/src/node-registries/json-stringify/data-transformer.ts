import { type NodeDataDTO } from '@coze-workflow/base';

import { type FormData } from './types';
import { OUTPUTS } from './constants';

/**
 * Node Backend Data - > Frontend Form Data
 */
export const transformOnInit = (value: NodeDataDTO) => ({
  ...(value ?? {}),
  outputs: value?.outputs ?? OUTPUTS,
});

/**
 * Front-end form data - > node back-end data
 * @param value
 * @returns
 */
export const transformOnSubmit = (value: FormData): NodeDataDTO =>
  value as unknown as NodeDataDTO;
