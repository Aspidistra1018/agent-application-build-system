import {
  type IFileAttributeKeys,
  type IFileCardTooltipsCopyWritingConfig,
  type IFileInfo,
  type Layout,
} from '@coze-common/chat-uikit-shared';

export interface IFileCardProps {
  file: IFileInfo;
  /**
   * Key used to identify success/failure status
   */
  attributeKeys: IFileAttributeKeys;
  /**
   * copywriting configuration
   */
  tooltipsCopywriting?: IFileCardTooltipsCopyWritingConfig;
  /**
   * Is it read-only?
   */
  readonly?: boolean;
  /**
   * Cancel upload event callback
   */
  onCancel: () => void;
  /**
   * Retry upload event callback
   */
  onRetry: () => void;
  /**
   * Copy URL event callback
   */
  onCopy: () => void;
  className?: string;
  layout: Layout;
  showBackground: boolean;
}
