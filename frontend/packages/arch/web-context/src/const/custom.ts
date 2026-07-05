// extract from apps/bot/src/constant/custom.ts

const enum CozeTokenInsufficientErrorCode {
  WORKFLOW = '702095072',
  BOT = '702082020',
}
/**
 * Insufficient Coze Token Error Code
 * When the error code appears, an additional stop and pull operation is required
 */
export const COZE_TOKEN_INSUFFICIENT_ERROR_CODE = [
  CozeTokenInsufficientErrorCode.BOT,
  CozeTokenInsufficientErrorCode.WORKFLOW,
];
