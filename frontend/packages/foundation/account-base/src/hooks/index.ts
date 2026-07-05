import { useEffect } from 'react';

import { useDocumentVisibility, useMemoizedFn } from 'ahooks';

import { type LoginStatus } from '../types';
import { useUserStore } from '../store/user';

/**
 * @Description is used to obtain user login status
 * @returns login status
 */
export const useLoginStatus = (): LoginStatus =>
  useUserStore(state => {
    if (state.isSettled) {
      return state.userInfo?.user_id_str ? 'logined' : 'not_login';
    }
    return 'settling';
  });

/**
 * @Description is used to obtain user information
 * @returns user information
 */
export const useUserInfo = () => useUserStore(state => state.userInfo);

/**
 * @Description Whether it is currently in an error state
 * @Returns whether it is an error
 */
export const useHasError = () => useUserStore(state => state.hasError);

const currentUidLSKey = 'coze_current_uid';
/**
 * It is used to detect logout events that occur under other tabs when multiple tabs are opened and trigger a prompt at the current time
 * @Param alert trigger prompt specific implementation
 */
export const useAlterOnLogout = (alert: () => void) => {
  const visibility = useDocumentVisibility();
  const loginStatus = useLoginStatus();

  const isLogined = loginStatus === 'logined';
  const memoizedAlert = useMemoizedFn(() => {
    alert();
  });

  useEffect(() => {
    if (visibility === 'hidden' && isLogined) {
      const lastUserId = useUserStore.getState().userInfo?.user_id_str;
      // In the login state, each time the page returns to the foreground from the background, re-check whether the logged in user has changed.
      return () => {
        const latestUserId = localStorage.getItem(currentUidLSKey);
        if (lastUserId !== latestUserId) {
          memoizedAlert();
        }
      };
    }
  }, [visibility, isLogined]);

  // Update local cache status after login status changes
  useEffect(() => {
    if (loginStatus !== 'settling') {
      localStorage.setItem(
        currentUidLSKey,
        useUserStore.getState().userInfo?.user_id_str ?? '',
      );
    }
  }, [loginStatus]);
};

export const useUserLabel = () => useUserStore(state => state.userLabel);

export const useUserAuthInfo = () => useUserStore(state => state.userAuthInfos);
