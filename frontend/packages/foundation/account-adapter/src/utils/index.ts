/* eslint-disable @coze-arch/use-error-in-catch */
import {
  refreshUserInfoBase,
  logoutBase,
  checkLoginBase,
  type Connector2Redirect,
} from '@coze-foundation/account-base';

import { passportApi } from '../passport-api';

export const refreshUserInfo = () =>
  refreshUserInfoBase(passportApi.checkLogin);

export const logout = () => logoutBase(passportApi.logout);

export const checkLoginImpl = async () => {
  try {
    const res = await passportApi.checkLogin();
    return { userInfo: res };
  } catch (e) {
    return { userInfo: undefined };
  }
};

export const checkLogin = () => checkLoginBase(checkLoginImpl);

// The open-source version does not support channel authorization and has not been implemented yet.
export const connector2Redirect: Connector2Redirect = () => undefined;
