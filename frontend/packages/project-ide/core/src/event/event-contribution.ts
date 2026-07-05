import { type Disposable } from '@flowgram-adapter/common';

export const EventService = Symbol('EventService');

export type EventName = string;

export type SupportEvent =
  | MouseEvent
  | DragEvent
  | KeyboardEvent
  | UIEvent
  | TouchEvent
  | any;
export type EventHandler = (event: SupportEvent) => boolean | undefined | void;

export interface EventRegsiter {
  handle: EventHandler;
  priority: number;
}

export interface EventService {
  /**
   * Monitor global events
   * @Param name The name of the event fired
   * @Param handles execution after triggering event
   * @param priority priority
   */
  listenGlobalEvent: (
    name: EventName,
    handle: EventHandler,
    priority?: number,
  ) => Disposable;
}

export const EventContribution = Symbol('EventContribution');

export interface EventContribution {
  /**
   * Register for events
   */
  registerEvent: (service: EventService) => void;
}
