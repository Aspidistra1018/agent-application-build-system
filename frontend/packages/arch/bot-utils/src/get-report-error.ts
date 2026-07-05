import { isObject } from 'lodash-es';

/**
 * @param inputError can pass anything, usually catch (e) that e.
 * @param reason explanation
 */
export const getReportError = (
  inputError: unknown,
  reason?: string,
): {
  error: Error;
  meta: Record<string, unknown>;
} => {
  if (inputError instanceof Error) {
    return {
      error: inputError,
      meta: { reason },
    };
  }
  if (!isObject(inputError)) {
    return {
      error: new Error(String(inputError)),
      meta: { reason },
    };
  }
  return {
    error: new Error(''),
    meta: { ...covertInputObject(inputError), reason },
  };
};

const covertInputObject = (inputError: object) => {
  if ('reason' in inputError) {
    return {
      ...inputError,
      reasonOfInputError: inputError.reason,
    };
  }
  return inputError;
};
