import { describe, it, expect } from 'vitest';

import { isFormSchemaPropertyEmpty } from '../../src/utils/is-property-empty';

describe('isFormSchemaPropertyEmpty', () => {
  // Test an empty object
  it('should return true for an empty object', () => {
    const emptyObject = {};
    expect(isFormSchemaPropertyEmpty(emptyObject)).toBe(true);
  });

  // Testing non-empty objects
  it('should return false for a non-empty object', () => {
    const nonEmptyObject = { key: 'value' };
    expect(isFormSchemaPropertyEmpty(nonEmptyObject)).toBe(false);
  });

  // Testing non-object values
  it('should return true for non-object values', () => {
    const values = [null, undefined, 123, 'string', true, false, []];
    values.forEach(value => {
      expect(isFormSchemaPropertyEmpty(value)).toBe(true);
    });
  });
});
