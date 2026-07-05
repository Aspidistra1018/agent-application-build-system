import { type ChatAreaEventCallback } from '@coze-common/chat-area';
export interface PluginBizContext {
  onInitialError: () => void;
  onImageClick?: ChatAreaEventCallback['onImageClick'];
  extraBody?: Record<string, string>;
}
