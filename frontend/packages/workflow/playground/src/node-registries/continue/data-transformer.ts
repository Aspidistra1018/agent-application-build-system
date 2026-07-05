import { type NodeDataDTO } from '@coze-workflow/base';

import { type FormData } from './types';

/**
 * Node Backend Data - > Frontend Form Data
 */
export const transformOnInit = (value: NodeDataDTO) => value;

/**
 * Front-end form data - > node back-end data
 * @param value
 * @returns
 */
export const transformOnSubmit = (value: FormData): NodeDataDTO =>
  value as unknown as NodeDataDTO;
