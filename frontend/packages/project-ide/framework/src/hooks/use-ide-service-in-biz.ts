import { type interfaces } from 'inversify';
import { useIDEContainer } from '@coze-project-ide/client';

/**
 * Get the IOC module of the IDE
 * The same content as the flow-ide/client package, but it can be called on the business side such as workflow
 * @param identifier
 */
export function useIDEServiceInBiz<T>(
  identifier: interfaces.ServiceIdentifier,
): T | undefined {
  const container = useIDEContainer();
  if (container.isBound(identifier)) {
    return container.get(identifier) as T;
  } else {
    return undefined;
  }
}
