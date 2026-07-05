import { injectable, inject } from 'inversify';
import { Emitter, type URI, WidgetManager } from '@coze-project-ide/client';

export interface MessageEvent<T = any> {
  name: string;
  data?: T;
}

/**
 * Widget communication service
 */
@injectable()
export class MessageEventService {
  @inject(WidgetManager) widgetManager: WidgetManager;

  /**
   * message queue
   */
  events = new Map<string, MessageEvent[]>();

  onSendEmitter = new Emitter<MessageEvent & { uri: URI }>();
  onSend = this.onSendEmitter.event;

  private toKey(uri: URI) {
    // Get the widget's unique index through URI
    return this.widgetManager.uriToWidgetID(uri);
  }

  /** Get message queue by URI */
  private get(uri: URI): MessageEvent[] {
    const key = this.toKey(uri);
    if (this.events.has(key)) {
      return this.events.get(key)!;
    }
    const queue = [];
    this.events.set(key, queue);
    return queue;
  }
  private delete(uri: URI) {
    const key = this.toKey(uri);
    return this.events.delete(key);
  }

  send(uri: URI, msg: MessageEvent) {
    this.get(uri).push(msg);
    this.onSendEmitter.fire({ uri, ...msg });
  }

  on(uri: URI) {
    const queue = this.get(uri);
    this.delete(uri);
    return queue;
  }

  compare(uriA: URI, uriB: URI) {
    return this.toKey(uriA) === this.toKey(uriB);
  }
}
