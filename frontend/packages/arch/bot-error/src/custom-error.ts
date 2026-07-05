export class CustomError extends Error {
  constructor(
    public eventName: string,
    public msg: string,
    public ext?: {
      customGlobalErrorConfig?: {
        title?: string;
        subtitle?: string;
      };
    },
  ) {
    super(msg);
    this.name = 'CustomError';
    this.ext = ext;
  }
}
// sladar beforeSend The captured error needs to determine the error type by .name.
export const isCustomError = (error: unknown): error is CustomError =>
  error instanceof CustomError ||
  (error as CustomError)?.name === 'CustomError';
