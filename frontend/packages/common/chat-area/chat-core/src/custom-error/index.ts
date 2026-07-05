export interface ExtErrorInfo {
  code?: number;
  local_message_id?: string;
  reply_id?: string;
  logId?: string;
  rawError?: unknown;
}
export class ChatCoreError extends Error {
  ext: ExtErrorInfo;
  constructor(message: string, ext?: ExtErrorInfo) {
    super(message);
    this.name = 'chatCoreError';
    this.ext = ext || {};
  }

  /**
   * Flatten error messages for easy filtering of error messages in slardar
   */
  flatten = () => {
    const { message, ext } = this;
    return {
      message,
      ...ext,
    };
  };
}
