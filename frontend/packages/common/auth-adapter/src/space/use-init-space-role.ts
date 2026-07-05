/**
 * The @file open-source version does not provide permission control functions for the time being. The methods exported in this file are for future expansion.
 */

import { useEffect } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { SpaceRoleType } from '@coze-arch/idl/developer_api';
import { useSpaceAuthStore } from '@coze-common/auth';

export function useInitSpaceRole(spaceId: string) {
  const { setIsReady, setRoles, isReady } = useSpaceAuthStore(
    useShallow(store => ({
      setIsReady: store.setIsReady,
      setRoles: store.setRoles,
      isReady: store.isReady[spaceId],
    })),
  );

  useEffect(() => {
    setRoles(spaceId, [SpaceRoleType.Owner]);
    setIsReady(spaceId, true);
  }, [spaceId]);

  return isReady;
}
