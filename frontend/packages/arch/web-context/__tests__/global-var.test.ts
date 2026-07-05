import { globalVars } from '../src/global-var';

describe('global-var', () => {
  test('should be able to set and get a property', () => {
    const testValue = 'Hello, World';
    // Set a property
    globalVars.TEST_PROP = testValue;

    // Make sure we can get the same properties
    expect(globalVars.TEST_PROP).toBe(testValue);
  });

  test('should return undefined for unset property', () => {
    expect(globalVars.UNSET_PROP).toBeUndefined();
  });

  test('should allow to overwrite an existing property', () => {
    const firstValue = 'First Value';
    const secondValue = 'Second Value';

    // Set a property first
    globalVars.OVERWRITE_PROP = firstValue;
    expect(globalVars.OVERWRITE_PROP).toBe(firstValue);

    // Override this property again
    globalVars.OVERWRITE_PROP = secondValue;
    expect(globalVars.OVERWRITE_PROP).toBe(secondValue);
  });
});
