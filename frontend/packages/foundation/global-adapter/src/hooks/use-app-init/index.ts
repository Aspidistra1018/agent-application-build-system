import { useEffect } from 'react';

import { reporter, logger } from '@coze-arch/logger';
import { useRouteConfig } from '@coze-arch/bot-hooks';
import { useErrorCatch } from '@coze-arch/bot-error';
import slardar from '@coze-studio/default-slardar';
import { useAlertOnLogout } from '@coze-foundation/global/use-app-init';
import {
  useSyncLocalStorageUid,
  useCheckLogin,
} from '@coze-foundation/account-adapter';

import { useSetResponsiveBodyStyle } from './use-responsive-body-style';
import { useResetStoreOnLogout } from './use-reset-store-on-logout';
import { useInitCommonConfig } from './use-init-common-config';

/**
 * All initialization logic converges here
 * Note that the login status needs to be handled by yourself.
 */
export const useAppInit = () => {
  const { requireAuth, requireAuthOptional, loginFallbackPath } =
    useRouteConfig();

  useCheckLogin({
    needLogin: !!(requireAuth && !requireAuthOptional),
    loginFallbackPath,
  });

  useSyncLocalStorageUid();

  useEffect(() => {
    reporter.info({ message: 'Ok fine' });
    reporter.init(slardar);
    logger.init(slardar);
  }, []);

  useErrorCatch(slardar);

  useInitCommonConfig();

  useResetStoreOnLogout();

  useSetResponsiveBodyStyle();

  useAlertOnLogout();
};
