/**
 * Off-line environment blocking; only exception output and asynchronous errors are thrown after build
 */
export const safeAsyncThrow = (e: string) => {
  const err = new Error(`[chat-area] ${e}`);
  if (IS_DEV_MODE || IS_BOE) {
    throw err;
  }

  setTimeout(() => {
    throw err;
  });
};
