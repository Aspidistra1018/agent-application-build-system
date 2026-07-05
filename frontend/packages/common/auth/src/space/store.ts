import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { type SpaceRoleType } from '@coze-arch/idl/developer_api';

interface SpaceAuthStoreState {
  // Role data for each space
  roles: {
    [spaceId: string]: SpaceRoleType[];
  };
  // The initialization status of the character data in each space, and whether the initialization is completed.
  isReady: {
    [spaceId: string]: boolean;
  };
}

interface SpaceAuthStoreAction {
  // Set the role of the space corresponding to the spaceId
  setRoles: (spaceId: string, roles: SpaceRoleType[]) => void;
  // Set whether the data of the space corresponding to the spaceId is ready
  setIsReady: (spaceId: string, isReady: boolean) => void;
  // Recovering spatial data
  destory: (spaceId) => void;
}
/**
 * SpaceAuthStore is designed to support multi-space switching and maintain data in multiple spaces. The location is due to bugs caused by the timing of space switching.
 */
export const useSpaceAuthStore = create<
  SpaceAuthStoreState & SpaceAuthStoreAction
>()(
  devtools(
    set => ({
      roles: {},
      isReady: {},
      setRoles: (spaceId, roles) =>
        set(state => ({
          roles: {
            ...state.roles,
            [spaceId]: roles,
          },
        })),
      setIsReady: (spaceId, isReady) =>
        set(state => ({ isReady: { ...state.isReady, [spaceId]: isReady } })),
      destory: spaceId =>
        set(state => ({
          roles: { ...state.roles, [spaceId]: [] },
          isReady: { ...state.isReady, [spaceId]: undefined },
        })),
    }),
    {
      enabled: IS_DEV_MODE,
      name: 'botStudio.spaceAuthStore',
    },
  ),
);
