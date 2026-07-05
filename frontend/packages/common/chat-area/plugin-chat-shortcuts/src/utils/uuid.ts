// Align the logic of card-builder generating ID, make a copy temporarily, and plan to use the underlying capabilities of card-buidler directly in the future
import { nanoid, customAlphabet } from 'nanoid';

/**
 * @param prefix - id prefix
 * @Param options - alphabet; length: length, default 10;
 */
export const shortid = (
  prefix = '',
  options?: {
    alphabet?: string;
    length?: number;
  },
) => {
  const {
    alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    length = 10,
  } = options || {};
  const genId = customAlphabet(alphabet, length);
  return `${prefix}${genId()}`;
};

export const uuid = () => nanoid();

export const id = shortid;

export const generate = shortid;
