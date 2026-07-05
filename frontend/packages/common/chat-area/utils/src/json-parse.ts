export const typeSafeJsonParse = (
  str: string,
  onParseError: (error: Error) => void,
): unknown => {
  try {
    return JSON.parse(str);
  } catch (e) {
    onParseError(e as Error);
    return null;
  }
};

/**
 * Generic type annotations may require the use of type declarations.
 * refer: https://github.com/microsoft/TypeScript/issues/15300.
 */
export const typeSafeJsonParseEnhanced = <T>({
  str,
  onParseError,
  verifyStruct,
  onVerifyError,
}: {
  str: string;
  onParseError: (error: Error) => void;
  /**
   * Implement a type check that returns whether it passes (boolean); in fact, it depends on self-awareness.
   * It can be defined separately or written as an internal connection function, but note that the return value is marked as predicate,
   * refer: https://github.com/microsoft/TypeScript/issues/38390.
   */
  verifyStruct: (sth: unknown) => sth is T;
  /** Error cause: validation crashed; validation failed */
  onVerifyError: (error: Error) => void;
}): T | null => {
  const res = typeSafeJsonParse(str, onParseError);

  function assertStruct(resLocal: unknown): asserts resLocal is T {
    const ok = verifyStruct(resLocal);
    if (!ok) {
      throw new Error('verify struct no pass');
    }
  }

  try {
    assertStruct(res);
    return res;
  } catch (e) {
    onVerifyError(e as Error);
    return null;
  }
};
