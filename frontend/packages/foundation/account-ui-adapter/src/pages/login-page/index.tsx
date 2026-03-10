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

import { type FC, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { I18n } from '@coze-arch/i18n';
import { Button, Form } from '@coze-arch/coze-design';
import { SignFrame, SignPanel } from '@coze-arch/bot-semi';

import { useLoginService } from './service';
import { Favicon } from './favicon';
import { PlatformBrand } from './platform-brand';

export const LoginPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('sso_email') || '');
  const [password, setPassword] = useState(searchParams.get('sso_password') || '');
  const [hasError, setHasError] = useState(false);

  const { login, register, loginLoading, registerLoading } = useLoginService({
    email,
    password,
  });

  const submitDisabled = !email || !password || hasError;

  // SSO自动登录
  useEffect(() => {
    const ssoEmail = searchParams.get('sso_email');
    const ssoPassword = searchParams.get('sso_password');
    
    if (ssoEmail && ssoPassword) {
      console.log('检测到SSO登录，自动登录中...');
      // 延迟执行登录，确保状态已更新
      setTimeout(() => {
        login();
      }, 100);
    }
  }, [searchParams, login]);

  return (
    <SignFrame brandNode={<PlatformBrand />}>
      <SignPanel className="w-[600px] h-[640px] pt-[96px] bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF5EF_100%)] border-[rgba(253,198,177,0.65)] shadow-[0_14px_32px_rgba(238,168,143,0.24)]">
        <div className="flex flex-col items-center w-full h-full">
          <Favicon />
          <div className="text-[24px] font-medium coze-fg-plug leading-[36px] mt-[32px]">
            {I18n.t('open_source_login_welcome')}
          </div>
          <div className="mt-[64px] w-[320px] flex flex-col items-stretch [&_.semi-input-wrapper]:overflow-hidden">
            <Form
              onErrorChange={errors => {
                setHasError(Object.keys(errors).length > 0);
              }}
            >
              <Form.Input
                data-testid="login.input.email"
                noLabel
                type="email"
                field="email"
                initValue={email}
                rules={[
                  {
                    required: true,
                    message: I18n.t('open_source_login_placeholder_email'),
                  },
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: I18n.t('open_source_login_placeholder_email'),
                  },
                ]}
                onChange={newVal => {
                  setEmail(newVal);
                }}
                placeholder={I18n.t('open_source_login_placeholder_email')}
              />
              <Form.Input
                data-testid="login.input.password"
                noLabel
                rules={[
                  {
                    required: true,
                    message: I18n.t('open_source_login_placeholder_password'),
                  },
                ]}
                field="password"
                type="password"
                initValue={password}
                onChange={setPassword}
                placeholder={I18n.t('open_source_login_placeholder_password')}
              />
            </Form>
            <Button
              data-testid="login.button.login"
              className="mt-[12px] border-0 text-white bg-[linear-gradient(90deg,rgb(253,198,177)_0%,rgb(247,141,167)_100%)] shadow-[0_8px_16px_rgba(240,150,130,0.35)] hover:brightness-95"
              disabled={submitDisabled || registerLoading}
              onClick={login}
              loading={loginLoading}
              color="brand"
            >
              {I18n.t('login_button_text')}
            </Button>
            <Button
              data-testid="login.button.signup"
              className="mt-[20px] border border-solid border-[rgba(253,198,177,0.9)] bg-[#FFF3ED] text-[#B85C4F] hover:bg-[#FFECE2]"
              disabled={submitDisabled || loginLoading}
              onClick={register}
              loading={registerLoading}
              color="primary"
            >
              {I18n.t('register')}
            </Button>
          </div>
        </div>
      </SignPanel>
    </SignFrame>
  );
};
