import {
  type ClipboardService,
  type EditorPluginContext,
  EditorProps,
  type FlowDocument,
  type FlowDocumentJSON,
  type FlowLayoutDefault,
  type FlowOperationService,
  type SelectionService,
  type FixedHistoryPluginOptions,
  type HistoryService,
} from '@flowgram-adapter/fixed-layout-editor';

export interface FixedLayoutPluginContext extends EditorPluginContext {
  document: FlowDocument;
  /**
   * Provide operation methods related to canvas nodes, and support redo/undo
   */
  operation: FlowOperationService;
  clipboard: ClipboardService;
  selection: SelectionService;
  history: HistoryService;
}

/**
 * fixed layout configuration
 */
export interface FixedLayoutProps
  extends EditorProps<FixedLayoutPluginContext, FlowDocumentJSON> {
  history?: FixedHistoryPluginOptions<FixedLayoutPluginContext> & {
    disableShortcuts?: boolean;
  };
  defaultLayout?: FlowLayoutDefault | string; // default layout
}

export const DEFAULT: FixedLayoutProps =
  EditorProps.DEFAULT as FixedLayoutProps;
