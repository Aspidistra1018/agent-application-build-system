import { type FC } from 'react';

import {
  type IChatUploadCopywritingConfig,
  DEFAULT_MAX_FILE_SIZE,
  UploadType,
} from '@coze-common/chat-uikit-shared';
import {
  FILE_TYPE_CONFIG,
  FileTypeEnum,
} from '@coze-common/chat-core/shared/const';
import { Toast, Upload } from '@coze-arch/coze-design';

interface IChatUploadProps {
  /**
   * Upload event callback
   * @param uploadType [IMAGE = 0 FILE = 1]
   * @param file
   * @returns void
   */
  onUpload: (uploadType: UploadType, file: File) => void;
  /**
   * Copywriting information configuration
   */
  copywritingConfig?: IChatUploadCopywritingConfig;
  /**
   * Maximum file size (in bytes)
   */
  maxFileSize?: number;
  isDisabled?: boolean;
  children: JSX.Element;
  limitFileCount?: number;
  isFileCountExceedsLimit: (fileCount: number) => boolean;
}

const findFileTypeConfig = (file: File) =>
  FILE_TYPE_CONFIG.find(
    cnf => cnf.judge?.(file) || cnf.accept.some(ext => file.name.endsWith(ext)),
  );

export const ChatUpload: FC<IChatUploadProps> = props => {
  const {
    copywritingConfig = {},
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    children,
    onUpload,
    isDisabled,
    isFileCountExceedsLimit,
    limitFileCount = 1,
  } = props;

  /**
   * handle uploads
   * @param fileList
   * @returns void
   */
  const handleUpload = (fileList: File[]) => {
    const { fileSizeReachLimitToast, fileExceedsLimitToast, fileEmptyToast } =
      copywritingConfig;

    if (isFileCountExceedsLimit(fileList.length)) {
      Toast.warning({
        showClose: false,
        content: fileExceedsLimitToast,
      });
      return;
    }

    if (!fileList.length) {
      return;
    }

    // Is there a file that is out of size?
    const hasOverflowLimitFileSize = fileList.some(
      file => file.size > maxFileSize,
    );
    const hasEmptyFile = fileList.some(file => file.size <= 0);

    // Error handling if the file size exceeds the expected size
    if (hasOverflowLimitFileSize) {
      Toast.warning({
        showClose: false,
        content: fileSizeReachLimitToast,
      });
    }

    if (hasEmptyFile) {
      Toast.warning({
        showClose: false,
        content: fileEmptyToast,
      });
    }

    const verifiedFileTypeConfigList = fileList
      .filter(file => file.size <= maxFileSize && file.size > 0)
      .map(file => ({
        file,
        fileTypeConfig: findFileTypeConfig(file),
      }));

    for (const fileConfig of verifiedFileTypeConfigList) {
      if (fileConfig.fileTypeConfig?.fileType === FileTypeEnum.IMAGE) {
        onUpload?.(UploadType.IMAGE, fileConfig.file);
      } else {
        onUpload?.(UploadType.FILE, fileConfig.file);
      }
    }
  };

  return (
    <Upload
      limit={limitFileCount === 1 ? 1 : undefined}
      draggable={false}
      action=""
      fileList={[]}
      onFileChange={handleUpload}
      disabled={isDisabled}
      multiple={limitFileCount > 1}
      uploadTrigger={'custom'}
    >
      {children}
    </Upload>
  );
};

ChatUpload.displayName = 'UiKitChatUpload';
