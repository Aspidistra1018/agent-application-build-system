import { RouterProvider } from 'react-router-dom';
import { type FC, useEffect, useState } from 'react';

import { initI18nInstance, I18n } from '@coze-arch/i18n/raw';
import { I18nProvider } from '@coze-arch/i18n/i18n-provider';

import { devRouter } from './routes';

const DevApp: FC = () => {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    initI18nInstance().then(() => setI18nReady(true));
  }, []);

  if (!i18nReady) {
    return null;
  }

  return (
    <I18nProvider i18n={I18n}>
      <RouterProvider router={devRouter} />
    </I18nProvider>
  );
};

export default DevApp;
