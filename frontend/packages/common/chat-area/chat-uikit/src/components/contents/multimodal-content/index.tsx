import { type ReactNode } from 'react';

import {
  type FileMixItem,
  type TextMixItem,
  type ImageMixItem,
} from '@coze-common/chat-core';
import { type GetBotInfo } from '@coze-common/chat-uikit-shared';

import { type IImageMessageContentProps } from '../image-content';
import { type IProps as IFileContentProps } from '../file-content';
import {
  isFileMixItem,
  isImageMixItem,
  isMultimodalContentListLike,
  isTextMixItem,
} from '../../../utils/multimodal';
import { TextItemList } from './text-item-list';
import { ImageItemList } from './image-item-list';
import { FileItemList } from './file-item-list';

import './index.less';

export type MultimodalContentProps = IImageMessageContentProps &
  IFileContentProps & {
    getBotInfo: GetBotInfo;
    renderTextContentAddonTop?: ReactNode;
    isContentLoading: boolean | undefined;
  };

/**
 * This component is not simple and should not actually be called Content.
 */

// TODO: @liushuoyan provides the switch~~
export const MultimodalContent: React.FC<MultimodalContentProps> = ({
  renderTextContentAddonTop,
  message,
  getBotInfo,
  fileAttributeKeys,
  copywriting: fileCopywriting,
  onCancel,
  onCopy,
  onRetry,
  readonly,
  onImageClick,
  layout,
  showBackground,
  isContentLoading,
}) => {
  const { content_obj } = message;
  if (!isMultimodalContentListLike(content_obj)) {
    // TODO: Broke news should need to add a unified bottom line and report
    return null;
  }

  const fileItemList = content_obj.item_list.filter(
    (item): item is FileMixItem => isFileMixItem(item),
  );

  const textItemList = content_obj.item_list.filter(
    (item): item is TextMixItem => isTextMixItem(item),
  );

  const imageItemList = content_obj.item_list.filter(
    (item): item is ImageMixItem => isImageMixItem(item),
  );

  return (
    <>
      <FileItemList
        fileItemList={fileItemList}
        fileAttributeKeys={fileAttributeKeys}
        fileCopywriting={fileCopywriting}
        readonly={readonly}
        onRetry={onRetry}
        onCancel={onCancel}
        onCopy={onCopy}
        message={message}
        layout={layout}
        showBackground={showBackground}
      />

      <ImageItemList
        imageItemList={imageItemList}
        message={message}
        onImageClick={onImageClick}
      />

      <TextItemList
        textItemList={textItemList}
        renderTextContentAddonTop={renderTextContentAddonTop}
        message={message}
        showBackground={showBackground}
        getBotInfo={getBotInfo}
        isContentLoading={isContentLoading}
      />
    </>
  );
};

MultimodalContent.displayName = 'MultimodalContent';
