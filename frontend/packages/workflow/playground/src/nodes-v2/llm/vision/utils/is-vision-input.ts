import { type InputValueVO } from '@coze-workflow/base';

/**
 * Is it visually comprehensible input?
 */
export const isVisionInput = (value: InputValueVO): boolean =>
  !!value?.input?.rawMeta?.isVision;
