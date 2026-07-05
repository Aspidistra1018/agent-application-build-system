import React, { useMemo } from 'react';

import { I18n } from '@coze-arch/i18n';

import { type ErrorFormPropsV2 } from '../../types';
import { ErrorFormCard } from './card';

export const ErrorForm: React.FC<ErrorFormPropsV2> = ({
  isOpen = false,
  json,
  onSwitchChange,
  onJSONChange,
  readonly,
  errorMsg,
  defaultValue,
  noPadding,
  ...props
}) => {
  const hasError = useMemo(() => {
    if (!isOpen) {
      return { rs: true };
    } else {
      // If there is an external error, just report the error directly.
      if (errorMsg) {
        return { rs: false, msg: errorMsg };
      }
      // When isOpen = true for the first time, json will be given the default value, and json = undefined for a moment. Just return true, otherwise it will flash.
      if (json === undefined) {
        return { rs: true };
      }
      try {
        const obj = JSON.parse(json);
        if (typeof obj !== 'object') {
          return {
            rs: false,
            msg: I18n.t('workflow_exception_ignore_json_error'),
          };
        }
        return { rs: true };
        // eslint-disable-next-line @coze-arch/use-error-in-catch
      } catch (e) {
        return {
          rs: false,
          msg: I18n.t('workflow_exception_ignore_json_error'),
        };
      }
    }
  }, [isOpen, json, errorMsg]);

  return (
    <ErrorFormCard
      isOpen={isOpen}
      json={json}
      onSwitchChange={onSwitchChange}
      onJSONChange={onJSONChange}
      readonly={readonly}
      errorMsg={hasError.msg}
      defaultValue={defaultValue}
      noPadding={noPadding}
      {...props}
    />
  );
};
