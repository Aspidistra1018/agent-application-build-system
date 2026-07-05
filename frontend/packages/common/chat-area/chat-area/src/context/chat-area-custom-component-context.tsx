import { createContext } from 'react';

import { type ComponentTypesMap } from '../components/types';

export interface ChatAreaCustomComponents {
  /**
   * @Deprecated, please use the plugin scheme
   */
  componentTypes?: Partial<ComponentTypesMap>;
}

export const ChatAreaCustomComponentContext =
  createContext<ChatAreaCustomComponents>({});

export const ChatAreaCustomComponentProvider =
  ChatAreaCustomComponentContext.Provider;
