// The maximum and minimum values of int64
export const INT64_MAX = BigInt('9223372036854775807');
export const INT64_MIN = BigInt('-9223372036854775808');

/**
 * Check if the value is in the int64 range
 * @Param value - string to check
 * @returns
 *  If it is a valid integer in the int64 range, return true.
 *  If invalid or out of range, return false
 */
export const isInInt64Range = (value: string): boolean => {
  if (
    value === '' ||
    value === undefined ||
    value === null ||
    Number.isNaN(value)
  ) {
    return false;
  }

  try {
    const bigIntValue = BigInt(value);
    if (bigIntValue > INT64_MAX || bigIntValue < INT64_MIN) {
      return false;
    }
    return true;
    // eslint-disable-next-line @coze-arch/use-error-in-catch -- normal business logic
  } catch {
    return false;
  }
};
