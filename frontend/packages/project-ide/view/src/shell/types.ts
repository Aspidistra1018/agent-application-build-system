import { type DockPanel, type Widget } from '../lumino/widgets';

/**
 * Version number control backward incompatibility issue
 */
export type ApplicationShellLayoutVersion =
  /** initialization version */
  0.2;

export const applicationShellLayoutVersion: ApplicationShellLayoutVersion = 0.2;

/**
 * The areas of the application shell where widgets can reside.
 */
export type Area =
  | 'main'
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'secondaryWindow';

/**
 * General options for the application shell. These are passed on construction and can be modified
 * through dependency injection (`ApplicationShellOptions` symbol).
 */
export interface Options extends Widget.IOptions {}

export interface LayoutData {
  version?: string | ApplicationShellLayoutVersion;
  mainPanel?: DockPanel.ILayoutConfig & {
    mode: DockPanel.Mode;
  };
  primarySidebar?: {
    widgets?: Widget[];
  };
  bottomPanel?: DockPanel.ILayoutConfig & {
    // Whether to fold
    expanded?: boolean;
  };
  split?: {
    main?: number[];
    leftRight?: number[];
  };
}

/**
 * Data to save and load the bottom panel layout.
 */
export interface BottomPanelLayoutData {
  config?: DockPanel.ILayoutConfig;
  size?: number;
  expanded?: boolean;
  pinned?: boolean[];
}
