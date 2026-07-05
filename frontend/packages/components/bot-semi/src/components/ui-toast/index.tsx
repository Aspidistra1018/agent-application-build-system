import React from 'react';

import { isString, isUndefined, merge, omitBy } from 'lodash-es';
import classNames from 'classnames';
import {
  IconToastError,
  IconToastInfo,
  IconToastSuccess,
  IconToastWarning,
} from '@coze-arch/bot-icons';
import { ToastReactProps } from '@douyinfe/semi-ui/lib/es/toast';
import { ToastFactory, Toast } from '@douyinfe/semi-ui';

import styles from './index.module.less';

// Toast display 80px from the top
Toast.config({
  top: 80,
});

const UIToast: ReturnType<(typeof ToastFactory)['create']> =
  ToastFactory.create();
function rewriteToastCreate(opts: ToastReactProps) {
  const { className, icon, ...rest } = opts;
  const getIcon = (): React.ReactNode => {
    if (icon) {
      return icon;
    }
    switch (rest.type) {
      case 'success':
        return <IconToastSuccess className={styles.icon} />;
      case 'warning':
        return <IconToastWarning className={styles.icon} />;
      case 'error':
        return <IconToastError className={styles.icon} />;
      case 'info':
        return <IconToastInfo className={styles.icon} />;
      default:
        return undefined;
    }
  };

  return Toast.create(
    cleanObject<ToastReactProps>({
      className: classNames(styles.container, className),
      icon: getIcon(),
      theme: 'light',
      // Default does not display close icon
      showClose: false,
      // Toast display 80px from the top
      top: 80,
      ...rest,
    }),
  );
}

type RequiredToastType = NonNullable<ToastReactProps['type']>;
function rewriteToastCreateAlias(): (opts: ToastReactProps) => string;
function rewriteToastCreateAlias(
  type: RequiredToastType,
): (opts: string | Omit<ToastReactProps, 'type'>) => string;
function rewriteToastCreateAlias(type?: RequiredToastType) {
  return (opts: string | Omit<ToastReactProps, 'type'>) => {
    if (isString(opts)) {
      return rewriteToastCreate({ content: opts, type });
    }
    return rewriteToastCreate(merge({}, opts, { type }));
  };
}
/* How to Override Toast */
UIToast.create = rewriteToastCreateAlias();
UIToast.info = rewriteToastCreateAlias('info');
UIToast.error = rewriteToastCreateAlias('error');
UIToast.success = rewriteToastCreateAlias('success');
UIToast.warning = rewriteToastCreateAlias('warning');

function cleanObject<T extends object = Record<string, unknown>>(params: T): T {
  return omitBy(params, isUndefined) as T;
}

export { UIToast };
