import { type URI } from '@coze-project-ide/client';

import { type ProjectIDEServices } from '../types';
import { type WidgetService } from '../plugins/create-preset-plugin/widget-service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface WidgetContext<T = any> {
  uri?: URI; // The URI of the current widget
  store: T; // The current widget store
  widget: WidgetService;
  services: ProjectIDEServices; // Global IDE service
}

export const WidgetContext = Symbol('WidgetContext');
