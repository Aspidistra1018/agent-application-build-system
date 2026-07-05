import { type FC } from 'react';

import { type FileMixItem } from '@coze-common/chat-core';
import {
  type IFileAttributeKeys,
  type IOnCopyUploadParams,
  type IOnRetryUploadParams,
  type IOnCancelUploadParams,
  type IMessage,
  type IFileCopywritingConfig,
  type Layout,
} from '@coze-common/chat-uikit-shared';

import FileCard from '../file-content/components/FileCard';
import { isFileMixItem } from '../../../utils/multimodal';

export interface FileItemListProps {
  message: IMessage;
  fileItemList: FileMixItem[];
  fileAttributeKeys?: IFileAttributeKeys;
  fileCopywriting?: IFileCopywritingConfig;
  readonly?: boolean;
  layout: Layout;
  showBackground: boolean;
  onCancel?: (params: IOnCancelUploadParams) => void;
  onCopy?: (params: IOnCopyUploadParams) => void;
  onRetry?: (params: IOnRetryUploadParams) => void;
}

export const FileItemList: FC<FileItemListProps> = ({
  fileItemList,
  fileAttributeKeys,
  fileCopywriting,
  readonly,
  onRetry,
  onCancel,
  onCopy,
  message,
  layout,
  showBackground,
}) => {
  /**
   * Handle the event of clicking Cancel Upload
   */
  const handleCancel = () => {
    onCancel?.({ message, extra: {} });
  };

  /**
   * Handling events that retry uploads
   */
  const handleRetry = () => {
    onRetry?.({ message, extra: {} });
  };

  /**
   * Handling events that copy file addresses
   */
  const handleCopy = () => {
    onCopy?.({ message, extra: {} });
  };

  return (
    <>
      {fileItemList.map(item => {
        if (isFileMixItem(item) && fileAttributeKeys) {
          return (
            <FileCard
              className="chat-uikit-multi-modal-file-image-content select-none"
              key={item.file.file_key}
              file={item.file}
              attributeKeys={fileAttributeKeys}
              tooltipsCopywriting={fileCopywriting?.tooltips}
              readonly={readonly}
              onCancel={handleCancel}
              onCopy={handleCopy}
              onRetry={handleRetry}
              layout={layout}
              showBackground={showBackground}
            />
          );
        }
        return null;
      })}
    </>
  );
};
