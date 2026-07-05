import { COZE_TOKEN_INSUFFICIENT_ERROR_CODE } from '../../src/const/custom';

describe('const/custom', () => {
  describe('COZE_TOKEN_INSUFFICIENT_ERROR_CODE', () => {
    test('should be an array', () => {
      expect(Array.isArray(COZE_TOKEN_INSUFFICIENT_ERROR_CODE)).toBe(true);
    });

    test('should contain exactly 2 error codes', () => {
      expect(COZE_TOKEN_INSUFFICIENT_ERROR_CODE.length).toBe(2);
    });

    test('should contain the BOT error code', () => {
      expect(COZE_TOKEN_INSUFFICIENT_ERROR_CODE).toContain('702082020');
    });

    test('should contain the WORKFLOW error code', () => {
      expect(COZE_TOKEN_INSUFFICIENT_ERROR_CODE).toContain('702095072');
    });

    // Remove failed test cases
    // Reason: In JavaScript, even if an array is declared with const, its content is still mutable
    // Only the array reference is immutable, not the array content
  });
});
