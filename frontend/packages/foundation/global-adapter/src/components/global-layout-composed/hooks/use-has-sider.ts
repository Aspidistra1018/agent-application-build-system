import { useLocation } from 'react-router-dom';

import { useIsLogined } from '@coze-arch/foundation-sdk';
import { useRouteConfig } from '@coze-arch/bot-hooks';

export const useHasSider = () => {
  const config = useRouteConfig();
  const location = useLocation();
  const isLogined = useIsLogined();
  const queryParams = new URLSearchParams(location.search);
  const pageMode = queryParams.get('page_mode');

  // Priority is given to using page_mode parameters to determine whether it is full screen mode
  if (config.pageModeByQuery && pageMode === 'modal') {
    return false;
  }

  const notCheckLoginPage =
    (config.requireAuth && config.requireAuthOptional) || !config.requireAuth;
  // Pages that can be accessed without logging in
  if (config.hasSider && notCheckLoginPage && !isLogined) {
    return false;
  }

  return !!config.hasSider;
};
