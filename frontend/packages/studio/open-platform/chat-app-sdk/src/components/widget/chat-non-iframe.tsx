import { useCallback, useEffect, useState, type FC } from 'react';

import { Language } from '@coze-studio/open-chat/types';
import { initI18nInstance, I18n } from '@coze-arch/i18n/raw';
import { I18nProvider } from '@coze-arch/i18n/i18n-provider';
import {
  zhCN,
  enUS,
  ConfigProvider,
  LocaleProvider,
} from '@coze-arch/bot-semi';

import { type ChatContentProps } from '@/types/chat';
import { useGlobalStore } from '@/store';

import { NonIframeBot } from './non-iframe-bot';
import { NonIframeApp } from './non-iframe-app';

import styles from './index.module.less';

export const ChatNonIframe: FC<ChatContentProps> = ({ client }) => {
  const options = client?.options;
  const setImagePreview = useGlobalStore(s => s.setImagePreview);
  const setIframeLoaded = useGlobalStore(s => s.setIframeLoaded);
  const lang = options?.ui?.base?.lang || Language.EN;
  const [i18nReady, setI18nReady] = useState(false);
  const locale = lang === Language.ZH_CN ? zhCN : enUS;

  const onImageClick = useCallback((extra: { url: string }) => {
    setImagePreview(preview => {
      preview.url = extra.url;
      preview.visible = true;
    });
  }, []);
  useEffect(() => {
    setIframeLoaded(true);
  }, []);

  useEffect(() => {
    initI18nInstance({ lng: lang }).then(() => setI18nReady(true));
  }, [lang]);

  if (!i18nReady) {
    return null;
  }
  return (
    <I18nProvider i18n={I18n}>
      <ConfigProvider>
        <LocaleProvider locale={locale}>
          <div className={styles.cozeIframe}>
            {options?.config?.type === 'app' ? (
              <NonIframeApp client={client} onImageClick={onImageClick} />
            ) : (
              <NonIframeBot client={client} onImageClick={onImageClick} />
            )}
          </div>
        </LocaleProvider>
      </ConfigProvider>
    </I18nProvider>
  );
};
