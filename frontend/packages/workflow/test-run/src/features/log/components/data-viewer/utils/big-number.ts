import BigNumber from 'bignumber.js';

/**
 * Is it a big number?
 * @param value
 * @returns
 */
export function isBigNumber(value: unknown): value is BigNumber {
  return !!(value && value instanceof BigNumber);
}

/**
 * Large number to string
 * @param value
 * @returns
 */
export function bigNumberToString(value: BigNumber): string {
  return value.toFixed();
}
