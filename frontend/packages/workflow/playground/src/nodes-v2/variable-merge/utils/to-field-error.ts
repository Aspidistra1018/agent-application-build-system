import { type FieldError } from '@flowgram-adapter/free-layout-editor';

/**
 * Convert to Filed Error
 * @param name
 * @param message
 * @returns
 */
export function toFieldError(name: string, message: string): FieldError {
  return {
    name,
    level: 'error',
    message,
  } as unknown as FieldError;
}
