import React from 'react';

import cls from 'classnames';
import { I18n, type I18nKeysNoOptionsType } from '@coze-arch/i18n';
import { Tooltip } from '@coze-arch/bot-semi';

import styles from './page-selector.module.less';

/** There are two types that cannot be selected */
export enum DisabledType {
  /** An unexpected condition caused it not to execute, the result is empty */
  Empty,
  /** Stops beyond the length of the run-time variable itself, expected */
  Stop,
}

export const NavigateItemDisabled: React.FC<
  React.PropsWithChildren<{
    type: DisabledType;
    options?: Record<string, unknown>;
  }>
> = ({ type, options, children }) => (
  <Tooltip
    content={
      type === DisabledType.Stop
        ? I18n.t(
            'workflow_detail_testrun_panel_batch_naviagte_stop' as I18nKeysNoOptionsType,
            options,
          )
        : I18n.t('workflow_detail_testrun_panel_batch_naviagte_empty')
    }
  >
    <div
      className={cls(
        styles['paginate-item-disabled'],
        styles['flow-test-run-log-pagination-item'],
      )}
    >
      {children}
    </div>
  </Tooltip>
);
