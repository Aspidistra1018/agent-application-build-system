import { type AsClass, type MaybePromise } from '@flowgram-adapter/common';
import { type URI } from '@coze-project-ide/core';

import { type LayoutPanelType, type ToolbarAlign } from '../types';
import { type ReactWidget } from './react-widget';

export const WidgetFactory = Symbol('WidgetFactory');

export interface ToolbarItem {
  // 1. Carry the commandId into command mode
  commandId?: string;
  tooltip?: string;
  // 2. Carry the render to the direct rendering mode
  render?: (widget: ReactWidget) => React.ReactElement<any, any> | null;

  /**
   * Toolbar alignment position, the default is ToolbarAlign. TRAILING
   */
  align?: ToolbarAlign;
}

export interface WidgetFactory {
  /**
   * The area where the widget panel is located
   */
  area: LayoutPanelType;
  /**
   * The toolbar of the widget panel, only dockpanel will render
   */
  toolbarItems?: ToolbarItem[];
  /**
   * Injection via render method
   */
  render?: () => React.ReactElement<any, any> | null;
  /**
   * Inject via widget
   */
  createWidget?: (uri: URI) => MaybePromise<ReactWidget>;
  /**
   * Specify the widget class
   */
  widget?: AsClass<ReactWidget>;
  /**
   * Panel matching based on URI
   */
  canHandle?: (uri: URI) => boolean;
  /**
   * Generate widget id by URI
   */
  getId?: (uri: URI) => string;
  /**
   * Business side regular matching through URI
   */
  match?: RegExp;
}
