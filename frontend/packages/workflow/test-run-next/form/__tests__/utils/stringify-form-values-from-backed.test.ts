import { describe, it, expect } from 'vitest';

import { stringifyFormValuesFromBacked } from '../../src/utils/stringify-form-values-from-backed';

describe('stringifyFormValuesFromBacked', () => {
  // When the test input is empty
  it('should return undefined when input is null or undefined', () => {
    expect(stringifyFormValuesFromBacked(null as any)).toBeUndefined();
    expect(stringifyFormValuesFromBacked(undefined as any)).toBeUndefined();
  });

  // Test if the input contains strings and boolean values
  it('should return the same string and boolean values', () => {
    const input = {
      str: 'hello',
      bool: true,
    };
    const result = stringifyFormValuesFromBacked(input);
    expect(result).toEqual({
      str: 'hello',
      bool: true,
    });
  });

  // Test if the input contains objects and arrays
  it('should stringify objects and arrays', () => {
    const input = {
      obj: { key: 'value' },
      arr: [1, 2, 3],
    };
    const result = stringifyFormValuesFromBacked(input);
    expect(result).toEqual({
      obj: '{"key":"value"}',
      arr: '[1,2,3]',
    });
  });

  // Test if the input contains null and undefined
  it('should set null and undefined values to undefined in the result', () => {
    const input = {
      nullValue: null,
      undefinedValue: undefined,
    };
    const result = stringifyFormValuesFromBacked(input);
    expect(result).toEqual({
      nullValue: undefined,
      undefinedValue: undefined,
    });
  });
});
