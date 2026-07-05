import {
  type URI,
  type ReactWidget,
  type LayoutPanelType,
} from '@coze-project-ide/client';

import { type WidgetContext } from '@/context/widget-context';

import { type CommandItem, type MenuItem, type ShortcutItem } from './services';

export interface WidgetRegistry<T = any> {
  // Widget rendering area
  area?: LayoutPanelType;
  // rule matching
  match: RegExp;
  canClose?: () => boolean;
  // data storage
  createStore?: (uri?: URI) => T;
  // Register
  registerCommands?: () => CommandItem<T>[];
  registerShortcuts?: () => ShortcutItem[];
  registerContextMenu?: () => MenuItem[];
  renderStatusbar?: (ctx: WidgetContext<T>) => void;
  renderIcon?: (ctx: WidgetContext<T>) => React.ReactElement<any, any>;
  renderContent: (
    ctx: WidgetContext<T>,
    widget?: ReactWidget,
  ) => React.ReactElement<any, any>;

  // Life Cycle
  load?: (ctx: WidgetContext<T>) => Promise<void>;
  /**
   * Note: For split-screen scenes, if there is a panel that has not been displayed before, it will focus that panel first, and then focus the currently selected panel.
   */
  onFocus?: (ctx: WidgetContext<T>) => void;
  /**
   * Business side destruction logic
   * The destruction logic of createStore is handled by the business side itself
   */
  onDispose?: (ctx: WidgetContext<T>) => void;
}

export const RegistryHandler = Symbol('RegistryHandler');

export type RegistryHandler<T = any> = WidgetRegistry<T>;
