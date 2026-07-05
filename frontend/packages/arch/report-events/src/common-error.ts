/* eslint-disable @typescript-eslint/naming-convention */
export enum CommonError {
  /** Webpack chunk load failed */
  ChunkLoadError = 'chunk_load_error',
  /** Parameter validation class error */
  parmasValidation = 'parmas_validation',
  /** Return the result, check the error */
  responseValidation = 'response_validation',
  /** Wrong path */
  errorPath = 'error_path',
  /** Error thrown by fws */
  fwsError = 'fws_error',
  /** Get tokens initialized */
  getTokenInit = 'get_token_init',
  /** get tokens get encode */
  getTokenEncode = 'get_token_encode',
  /** Error getting tokens */
  getTokenError = 'get_token_error',
  /** Form validation error */
  formValidation = 'form_validation',
  /** Third-party login failed */
  thirdPartyAuth = 'third_party_auth',
  /** Errors for general use */
  normalError = 'normal_error',
  /** Get bot diff error */
  getBotDiffError = 'get_bot_diff_error',
  /** merge bot diff error */
  mergeBotDiffError = 'merge_bot_diff_error',
}
