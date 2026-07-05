import { describe, it, expect } from 'vitest';

import { safeJsonParse } from '../../src/utils/safe-json-parse';

describe('utils-safe-json-parse', () => {
  // Test parsing JSON string normally
  it('should parse valid JSON string', () => {
    const jsonString = '{"key": "value"}';
    const result = safeJsonParse(jsonString);
    expect(result).toEqual({ key: 'value' });
  });

  // Test parsing invalid JSON string
  it('should return undefined when parsing invalid JSON string', () => {
    const invalidJsonString = '{key: "value"}';
    const result = safeJsonParse(invalidJsonString);
    expect(result).toBeUndefined();
  });

  // Test empty string input
  it('should return emptyValue when input is an empty string', () => {
    const emptyString = '';
    const emptyValue = {};
    const result = safeJsonParse(emptyString, { emptyValue });
    expect(result).toBe(emptyValue);
  });

  it('should return object when input is an empty object', () => {
    const value = {};
    expect(safeJsonParse(value)).toBe(value);
  });
});
