// eslint-disable-next-line @typescript-eslint/no-explicit-any -- I don't know why unknown doesn't work, it will cause type conversion to fail
export type MakeValueUndefinable<T extends Record<string, any>> = {
  [k in keyof T]: T[k] | undefined;
};
