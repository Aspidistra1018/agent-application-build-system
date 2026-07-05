import { type FC } from 'react';

import { I18n, type I18nKeysNoOptionsType } from '@coze-arch/i18n';
import { Button } from '@coze-arch/coze-design';

import {
  getServerError,
  type SDKInitError,
  ServerErrorCode,
  specCodeList,
} from '@/util/error';
import ErrorUnbindPng from '@/assets/error-unbind.png';
import ErrorDefaultPng from '@/assets/error-default.png';

import styles from './index.module.less';

export interface InitErrorFallback {
  /**
   * null 表示未获取到报错信息
   */
  error: SDKInitError | null;
  onBeforeRetry?: () => void;
  refresh?: () => void;
}

const ErrorFallback: FC<InitErrorFallback> = ({
  error,
  onBeforeRetry,
  refresh,
}) => {
  let msg = I18n.t('overview_bi_assistant_system_error');
  if (error) {
    msg = error.msg;
    const wrapError = getServerError(error);

    if (wrapError) {
      msg = wrapError.msg;
    }
  }
  const defaultError = I18n.t('web_sdk_retry_notification');

  const hideExtra = !!error?.code && specCodeList.includes(error.code);

  return (
    <div className={styles.wrapper}>
      <img className={styles.icon} src={getErrorIcon(error)} />
      <div className={styles.message}>{msg}</div>
      {!hideExtra && (
        <div className={styles.extra}>
          {I18n.t(
            `web_sdk_api_error_${error?.code}` as I18nKeysNoOptionsType,
            {},
            defaultError,
          )}
        </div>
      )}
      <Button
        className={styles.btn}
        onClick={() => {
          onBeforeRetry?.();
          if (refresh) {
            refresh?.();
          } else {
            location.reload();
          }
        }}
      >
        {I18n.t('retry')}
      </Button>
    </div>
  );
};

export default ErrorFallback;

export const getErrorIcon = (error: SDKInitError | null) => {
  switch (error?.code) {
    case ServerErrorCode.BotUnbind:
      return ErrorUnbindPng;
    default:
      return ErrorDefaultPng;
  }
};
