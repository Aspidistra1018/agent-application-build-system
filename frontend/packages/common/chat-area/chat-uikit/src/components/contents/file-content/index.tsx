import { type FC } from 'react';

import classNames from 'classnames';
import {
  type IFileAttributeKeys,
  type IOnRetryUploadParams,
  type IOnCancelUploadParams,
  type IOnCopyUploadParams,
  type IFileCopywritingConfig,
  type IBaseContentProps,
  type Layout,
} from '@coze-common/chat-uikit-shared';

import { safeJSONParse } from '../../../utils/safe-json-parse';
import { isFile } from '../../../utils/is-file';
import FileCard from './components/FileCard';

export type IProps = IBaseContentProps & {
  copywriting?: IFileCopywritingConfig;
  fileAttributeKeys?: IFileAttributeKeys;
  onCancel?: (params: IOnCancelUploadParams) => void;
  onRetry?: (params: IOnRetryUploadParams) => void;
  onCopy?: (params: IOnCopyUploadParams) => void;
  layout: Layout;
  showBackground: boolean;
};

export const FileContent: FC<IProps> = props => {
  const {
    message,
    copywriting,
    fileAttributeKeys,
    readonly,
    onCancel,
    onCopy,
    onRetry,
    layout,
    showBackground,
  } = props;

  const { content_obj = safeJSONParse(message.content) } = message;

  /**
   * Determine whether it is a card of file type, or refuse to use the card without configuring the file attribute config
   */
  if (
    !isFile(content_obj) ||
    !fileAttributeKeys ||
    content_obj.file_list.length <= 0
  ) {
    return null;
  }

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
  const handleCopy = (fileIndex?: number) => {
    onCopy?.({ message, extra: { fileIndex } });
  };

  return (
    <>
      {content_obj.file_list.map((file, index) => (
        <FileCard
          file={file}
          attributeKeys={fileAttributeKeys}
          tooltipsCopywriting={copywriting?.tooltips}
          readonly={readonly}
          onCancel={handleCancel}
          onCopy={() => handleCopy(index)}
          onRetry={handleRetry}
          layout={layout}
          showBackground={showBackground}
          className={classNames({
            'mb-[8px]': index < content_obj.file_list.length - 1,
          })}
        />
      ))}
    </>
  );
};

FileContent.displayName = 'FileContent';
