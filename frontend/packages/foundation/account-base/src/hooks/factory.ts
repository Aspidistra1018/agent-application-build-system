import { useEffect } from 'react';

import { useMemoizedFn } from 'ahooks';
import {
  APIErrorEvent,
  handleAPIErrorEvent,
  removeAPIErrorEvent,
} from '@coze-arch/bot-api';

import { checkLoginBase } from '../utils/factory';
import { type UserInfo } from '../types';
import { useUserStore } from '../store/user';

/**
 * It is used to check the login status when the page is initialized, and listen for the interface error if the login status is invalid.
 * When the login status fails, it will be redirected to the login page
 * @param needLogin is required
 * @Param checkLogin Check the specific implementation of login status
 * @Param goLogin Redirect to login page concrete implementation
 */
export const useCheckLoginBase = (
  needLogin: boolean,
  checkLoginImpl: () => Promise<{
    userInfo?: UserInfo;
    hasError?: boolean;
  }>,
  goLogin: () => void,
) => {
  const isSettled = useUserStore(state => state.isSettled);

  const memoizedGoLogin = useMemoizedFn(goLogin);

  useEffect(() => {
    if (!isSettled) {
      checkLoginBase(checkLoginImpl);
    }
  }, [isSettled]);

  useEffect(() => {
    const isLogined = !!useUserStore.getState().userInfo?.user_id_str;
    // The current page requires login. If the login check result is not logged in, redirect back to the login page.
    if (needLogin && isSettled && !isLogined) {
      memoizedGoLogin();
    }
  }, [needLogin, isSettled]);

  useEffect(() => {
    let fired = false;
    const handleUnauthorized = () => {
      useUserStore.getState().reset();
      if (needLogin) {
        if (!fired) {
          fired = true;
          memoizedGoLogin();
        }
      }
    };
    // This function is triggered when the Ajax request backend interface appears not authorized/logged in
    handleAPIErrorEvent(APIErrorEvent.UNAUTHORIZED, handleUnauthorized);
    return () => {
      removeAPIErrorEvent(APIErrorEvent.UNAUTHORIZED, handleUnauthorized);
    };
  }, [needLogin]);
};
