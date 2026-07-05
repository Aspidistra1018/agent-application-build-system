export enum FileItemStatus {
  Success = 'success',
  UploadFail = 'uploadFail',
  ValidateFail = 'validateFail',
  Validating = 'validating',
  Uploading = 'uploading',
  Wait = 'wait',
}

// Image types that support preview
export const PREVIEW_IMAGE_TYPE = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
