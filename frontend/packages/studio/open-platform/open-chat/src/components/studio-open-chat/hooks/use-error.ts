import { useState } from 'react';

import { Toast } from '@coze-arch/bot-semi';

import { type SDKInitError } from '@/util/error';
import { catchParse } from '@/util';

type ErrorState = boolean | SDKInitError;
export type SetInitError = (error: ErrorState) => void;
export const useError = () => {
  const [initError, setError] = useState<ErrorState>(false);

  return {
    initError,
    setInitError: (error: ErrorState) => {
      if (!error) {
        setError(error);
      } else {
        if (initError && typeof initError !== 'boolean') {
          return;
        }
        setError(error);
      }
    },
    onMessageSendFail: (_params, _from, error) => {
      if (error instanceof Error) {
        const res = catchParse<{ code?: number; msg?: string }>(
          error.message,
          {},
        );

        if (res?.code && res?.msg) {
          Toast.error(res.msg);
        }
      }
    },
  };
};
