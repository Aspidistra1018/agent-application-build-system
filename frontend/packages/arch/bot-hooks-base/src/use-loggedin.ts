import { userStoreService } from '@coze-studio/user-store';

/**
 * Determine whether the current user is logged in
 */
export const useLoggedIn = () => userStoreService.useIsLogined();
