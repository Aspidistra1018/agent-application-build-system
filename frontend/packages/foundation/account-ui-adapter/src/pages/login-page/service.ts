/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useRequest } from 'ahooks';
import { passport } from '@coze-studio/api-schema';
import {
  setUserInfo,
  useLoginStatus,
  type UserInfo,
} from '@coze-foundation/account-adapter';

export const useLoginService = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const loginService = useRequest(
    async () => {
      const res = (await passport.PassportWebEmailLoginPost({
        email,
        password,
      })) as unknown as { data: UserInfo };
      return res.data;
    },
    {
      manual: true,
      onSuccess: setUserInfo,
    },
  );

  const registerService = useRequest(
    async () => {
      const res = (await passport.PassportWebEmailRegisterV2Post({
        email,
        password,
      })) as unknown as { data: UserInfo };
      return res.data;
    },
    {
      manual: true,
      onSuccess: setUserInfo,
    },
  );

  const loginStatus = useLoginStatus();

  useEffect(() => {
    if (loginStatus === 'logined') {
      const redirect = searchParams.get('redirect');
      navigate(redirect || '/');
    }
  }, [loginStatus, navigate, searchParams]);

  // SSO自动登录：检查URL参数
  useEffect(() => {
    const ssoEmail = searchParams.get('sso_email');
    const ssoPassword = searchParams.get('sso_password');
    
    if (ssoEmail && ssoPassword && !loginService.loading) {
      console.log('检测到SSO登录参数，自动登录中...');
      // 自动触发登录
      loginService.run();
    }
  }, [searchParams, loginService]);

  return {
    login: loginService.run,
    register: registerService.run,
    loginLoading: loginService.loading,
    registerLoading: registerService.loading,
  };
};
