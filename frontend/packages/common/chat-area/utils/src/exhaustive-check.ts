/**
 * Check for no missing items
 */
export const exhaustiveCheckForRecord = (_: Record<string, never>) => undefined;

export const exhaustiveCheckSimple = (_: never) => undefined;
