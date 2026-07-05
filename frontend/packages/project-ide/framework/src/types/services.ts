import { type ViewService } from '@/plugins/create-preset-plugin/view-service';
import { type WidgetContext } from '@/context/widget-context';

export interface CommandItem<T> {
  id: string;
  label: string;
  when?: 'widgetFocus';
  execute: (ctx?: WidgetContext, props?: T) => void;
  isEnable: (ctx?: WidgetContext, props?: T) => boolean;
}

export interface ShortcutItem {
  // ID bound in the command system
  commandId: string;
  // shortcut
  keybinding: string;
  // Whether to block browser native behavior
  preventDefault: boolean;
}

export interface CommandService {
  execute: (id: string, ...args: any[]) => void; // execute the command
}

export interface MenuItem {
  /**
   * Use the id of a registered command
   */
  commandId: string;
  /**
   * element selector
   * Class:. class
   * id：#id
   */
  selector: string;
  /**
   * submenu
   */
  submenu?: MenuItem[];
}

export interface ContextMenuService {
  open: (e: React.MouseEvent) => boolean; // There are no menu registration items, return false
  registerContextMenu: (options: MenuItem[], match?: RegExp) => void; // Imported parameters are like registerContextMenu in widgetRegistry
}

export interface ProjectIDEServices {
  contextmenu: ContextMenuService; // Right-click menu service
  command: CommandService; // command service
  view: ViewService;
}
