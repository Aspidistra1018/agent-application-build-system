const policyExceptionCodeList = [
  /** Risk control interception */
  '700012014',
];

/**
 * Temporarily distinguish whether the chat area inits an abnormal risk control strategy
 * In the future, you need to configure the interceptor thrown by the exception in chatCore
 */
export const getIsPolicyException = (error: Error) => {
  /**
   * At present, the external chat area init methods have all gone. The error thrown after the xxxAPI exception of the business encapsulation is APIError in the shape of
   * constructor(
   *  public code: string,
   *  public msg: string | undefined,
   * )
   */
  if ('code' in error) {
    return policyExceptionCodeList.includes(String(error.code));
  }
  return false;
};
