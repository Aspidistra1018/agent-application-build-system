import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import { usePageRuntimeStore } from '@coze-studio/bot-detail-store/page-runtime';
import { I18n } from '@coze-arch/i18n';

const useEditConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { savingInfo } = usePageRuntimeStore.getState();
  const leaveWarningInfo = I18n.t('pop_edit_save_confirm');

  // Save navigate and location.pathname references
  const navigateRef = useRef(navigate);
  const locationRef = useRef(location.pathname);
  const debouncingRef = useRef(savingInfo.debouncing);

  function isNoNeedConfirm() {
    return !debouncingRef.current;
  }

  function handleBeforeUnload(event) {
    if (isNoNeedConfirm()) {
      return;
    }

    event.preventDefault();
    event.returnValue = leaveWarningInfo;
  }

  useEffect(() => {
    // When popstate executes the callback, it will save the supported values due to the closure generated, so it needs to be dealt with here.
    navigateRef.current = navigate;
    locationRef.current = location.pathname;

    const unSubDebouncing = usePageRuntimeStore.subscribe(
      store => store.savingInfo.debouncing,
      debouncing => {
        debouncingRef.current = debouncing;
      },
    );

    return () => {
      unSubDebouncing();
    };
  }, [navigate, location]);

  useEffect(() => {
    // Refresh page & close page condition, use beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [history]);
};

export { useEditConfirm };
