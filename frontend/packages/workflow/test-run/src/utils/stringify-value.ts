import { isBoolean, isNumber } from 'lodash-es';

// Convert form values to testrun interface protocol format
export const stringifyValue = (
  values: any,
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
