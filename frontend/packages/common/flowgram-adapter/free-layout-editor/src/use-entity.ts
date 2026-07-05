import { useLayoutEffect } from 'react';

import {
  type Entity,
  EntityManager,
  type EntityRegistry,
  usePlaygroundContainer,
  useRefresh,
} from '@flowgram.ai/free-layout-editor';

/**
 * Get entities and listen for changes
 * Please use useConfigEntity instead
 * @deprecated
 */
export function useEntity<T extends Entity>(
  entityRegistry: EntityRegistry,
  autoCreate = true,
): T {
  const entityManager = usePlaygroundContainer().get(EntityManager);
  const entity = entityManager.getEntity<T>(entityRegistry, autoCreate) as T;
  const refresh = useRefresh(entity.version);
  useLayoutEffect(() => {
    const dispose = entity.onEntityChange(() => {
      refresh(entity.version);
    });
    return () => dispose.dispose();
  }, [entityManager, refresh, entity]);
  return entity;
}
