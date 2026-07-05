import { type Event } from '@flowgram-adapter/common';

import { type URI } from '../common';
import { type LabelChangeEvent } from './label-handler';

export const LabelService = Symbol('LabelService');
/**
 * Provide, global label data acquisition
 */
export interface LabelService {
  /**
   * Triggered after label change
   */
  get onChange(): Event<LabelChangeEvent>;

  /**
   * Get label icon
   * @param element
   */
  getIcon: (element: URI) => string | React.ReactNode;

  /**
   * Get custom rendering of label
   */
  renderer: (element: URI, opts?: any) => React.ReactNode;

  /**
   *  Get label name
   * @param element
   */
  getName: (element: URI) => string;

  /**
   * Get the description of the label
   * @param element
   */
  getDescription: (element: URI) => string;
}
