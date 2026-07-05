export enum FileItemStatus {
  Success = 'success',
  UploadFail = 'uploadFail',
  ValidateFail = 'validateFail',
  Validating = 'validating',
  Uploading = 'uploading',
  Wait = 'wait',
}

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
