export const isPromiseLike = <T>(it: unknown): it is PromiseLike<T> =>
  it instanceof Promise || typeof (it as { then: string })?.then === 'function';
