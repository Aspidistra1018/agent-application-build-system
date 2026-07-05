import * as React from 'react';

import { injectable, type interfaces, unmanaged } from 'inversify';
import { Emitter } from '@flowgram-adapter/common';
import { type URI } from '@coze-project-ide/core';

import { type Widget } from '../lumino/widgets';
import { AbstractWidget } from './base-widget';

export const ReactWidgetContext = React.createContext<ReactWidget | undefined>(
  undefined,
);

@injectable()
export abstract class ReactWidget extends AbstractWidget {
  /**
   * widget resource uri
   */
  uri?: URI;

  /**
   * Container widget
   * This property only exists in the child panel. It is convenient to access the property through the parent container.
   */
  wrapperWidget?: ReactWidget;

  onWidgetResizeEmitter = new Emitter<Widget.ResizeMessage>();

  onWidgetResize = this.onWidgetResizeEmitter.event;

  constructor(@unmanaged() options?: Widget.IOptions) {
    super(options);
    this.scrollOptions = {
      suppressScrollX: true,
      minScrollbarLength: 35,
    };
  }

  /**
   * Return an underlying resource URI.
   */
  getResourceURI(): URI | undefined {
    return this.uri?.withoutQuery();
  }

  /**
   * Creates a new URI to which this navigatable should moved based on the given target resource URI.
   */
  onOpenRequest?(resourceURI: URI, options?: any): void;

  protected onResize(msg: Widget.ResizeMessage): void {
    super.onResize(msg);
    this.onWidgetResizeEmitter.fire(msg);
  }

  /**
   *
   * @Param uri Initialized uri
   * @param childContainer view props will only have childContainer when the widget property is passed in
   */
  init(uri: URI, childContainer?: interfaces.Container): void {
    this.uri = uri;
  }

  abstract render(): React.ReactElement<any, any> | null;
}
