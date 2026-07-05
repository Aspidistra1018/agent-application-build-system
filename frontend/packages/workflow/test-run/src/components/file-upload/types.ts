import type { FileItemStatus } from '../file-icon';

export interface FileItem extends File {
  // unique identifier
  uid?: string;
  // File address
  url?: string;
  // upload progress
  percent?: number;
  // verification information
  validateMessage?: string;
  status?: FileItemStatus;
  [key: string]: any;
}
