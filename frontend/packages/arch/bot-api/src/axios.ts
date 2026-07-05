import { Toast } from '@coze-arch/bot-semi';
import {
  axiosInstance,
  isApiError,
  type AxiosRequestConfig,
} from '@coze-arch/bot-http';

// Toast display 80px from the top
Toast.config({
  top: 80,
});

interface CustomAxiosConfig {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __disableErrorToast?: boolean;
}

/**
 * Business custom axios configuration
 * @param __disableErrorToast default: false
 */
export type BotAPIRequestConfig = AxiosRequestConfig & CustomAxiosConfig;

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    // business logic
    if (
      isApiError(error) &&
      error.msg &&
      !(error.config as CustomAxiosConfig).__disableErrorToast
    ) {
      Toast.error({
        content: error.msg,
        showClose: false,
      });
    }

    throw error;
  },
);

export { axiosInstance };
