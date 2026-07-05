import { GlobalEventBus } from '@coze-arch/web-context';

// API request related events
export enum APIErrorEvent {
  // No login status
  UNAUTHORIZED = 'unauthorized',
  // Logged in, no permission.
  NOACCESS = 'noAccess',
  // Risk control interception
  SHARK_BLOCK = 'sharkBlocked',
  // State restrictions
  COUNTRY_RESTRICTED = 'countryRestricted',
  // Insufficient COZE TOKEN
  COZE_TOKEN_INSUFFICIENT = 'cozeTokenInsufficient',
}

const getEventBus = () => GlobalEventBus.create<APIErrorEvent>('bot-http');

export const emitAPIErrorEvent = (event: APIErrorEvent, ...data: unknown[]) => {
  const evenBus = getEventBus();

  evenBus.emit(event, ...data);
};

export const handleAPIErrorEvent = (
  event: APIErrorEvent,
  fn: (...args: unknown[]) => void,
) => {
  const evenBus = getEventBus();

  evenBus.on(event, fn);
};

export const removeAPIErrorEvent = (
  event: APIErrorEvent,
  fn: (...args: unknown[]) => void,
) => {
  const evenBus = getEventBus();

  evenBus.off(event, fn);
};

export const stopAPIErrorEvent = () => {
  const evenBus = getEventBus();

  evenBus.stop();
};

export const startAPIErrorEvent = () => {
  const evenBus = getEventBus();

  evenBus.start();
};

export const clearAPIErrorEvent = () => {
  const evenBus = getEventBus();

  evenBus.clear();
};
