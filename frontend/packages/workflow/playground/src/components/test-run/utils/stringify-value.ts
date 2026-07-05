import { isBoolean, isNumber } from 'lodash-es';

// Convert form values to testrun interface protocol format
const stringifyValue = (
  values: object,
  stringifyKeys?: string[],
): Record<string, string> | undefined => {
  if (!values) {
    return undefined;
  }
  return Object.entries(values).reduce<Record<string, string>>(
    (buf, [k, v]) => {
      if (isBoolean(v) || isNumber(v)) {
        buf[k] = String(v);
      } else if (stringifyKeys?.includes(k)) {
        buf[k] = JSON.stringify(v);
      } else {
        buf[k] = v as string;
      }
      return buf;
    },
    {},
  );
};

// Ensure that the default values passed in are of type string; the values in the current form are of type string, which can be handled simply. Multiple default value types may be required for verification in the future.
const stringifyDefaultValue = (value: object) => {
  if (!value) {
    return undefined;
  }
  return Object.keys(value).reduce((acc, key) => {
    const val = value[key];
    // Bool needs special treatment
    if (typeof val === 'string' || isBoolean(val)) {
      acc[key] = val;
    } else {
      acc[key] = JSON.stringify(value[key]);
    }
    return acc;
  }, {});
};

export { stringifyValue, stringifyDefaultValue };
