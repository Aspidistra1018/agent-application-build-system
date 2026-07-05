import { getKeyLabel, isKeyStringMatch } from '../utils';

export interface Keybinding {
  /**
   * Associated command, the command executed after the keybinding is triggered
   */
  command: string;
  /**
   * Associated shortcuts, like: meta c
   */
  keybinding: string;
  /**
   * Whether to block the browser's default behavior
   */
  preventDefault?: boolean;
  /**
   * Keybinding triggering context, associated with the contextkey service
   */
  when?: string;
  /**
   * Parameters to trigger commands via keybinding
   */
  args?: any;
}

/**
 * KiyBinding related export method
 */
export namespace Keybinding {
  /**
   * Match keyboard event whether macth shortcut configuration
   */
  export const isKeyEventMatch = isKeyStringMatch;

  export const getKeybindingLabel = getKeyLabel;
}
