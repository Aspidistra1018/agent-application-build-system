export type NullableType<T> = {
  [P in keyof T]: T[P] | null;
};

export type NonNullableType<T> = {
  [P in keyof T]: Exclude<T[P], null>;
};

type AllOptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];
type AllNonOptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

/**
 * It is required that the parameters must be passed, and the undefined value can be reserved.
 * Prevent missing keys during passthrough
 * refer: https://stackoverflow.com/a/75389230/7526989
 */
export type NormalizeParameter<T> = {
  [K in AllOptionalKeys<T>]: T[K] | undefined;
} & {
  [K in AllNonOptionalKeys<T>]: T[K];
};
