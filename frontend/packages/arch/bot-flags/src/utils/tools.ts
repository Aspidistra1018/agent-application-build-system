export const isObject = (obj: unknown) => typeof obj === 'object';

export const isEqual = (
  obj1: Record<string, boolean> | undefined,
  obj2: Record<string, boolean> | undefined,
) => {
  // If any one is not an object, return false directly.
  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }
  const o1 = obj1 as Record<string, boolean>;
  const o2 = obj2 as Record<string, boolean>;

  // Check that two objects have the same number of keys. If the numbers are different, they must not be equal
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }

  // If the number of keys is the same, then we check the value of each key
  for (const key in o1) {
    // If the key does not exist in the second object, or the values are different, return false.
    if (!(key in o2) || o1[key] !== o2[key]) {
      return false;
    }
  }

  // Returns true if all keys exist in both objects and all values are the same.
  return true;
};
