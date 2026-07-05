import { type interfaces } from 'inversify';

import { useIDEContainer } from './use-ide-container';

/**
 * Get the IOC module of the IDE
 * @param identifier
 */
export function useIDEService<T>(identifier: interfaces.ServiceIdentifier): T {
  const container = useIDEContainer();
  return container.get(identifier) as T;
}
