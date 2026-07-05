export enum ReportEventNames {
  /**
   * generic exception error
   */
  ChunkLoadError = 'chunk_load_error', // Webpack chunk load failed
  Unhandledrejection = 'unhandledrejection', // Asynchronous Error Bottom Line
  GlobalErrorBoundary = 'global_error_boundary', // Global errorBoundary error
  NotInstanceError = 'notInstanceError',
  CustomErrorReport = 'custom_error_report', // Uniformly reported customs errors
}

/**
 *  Get the error that has been identified
 *
 * 1. CustomError: The business party throws new CustomError (ReportEventNames.xxx, 'xxx')
 * 2. AxiosError: The status code is not 2xx;
 * 3, ApiError: status code 2xx & business code! == 0
 * 4. ChunkLoadError: webpack chunk load failed
 * 5. notInstanceError, error that does not inherit Error, the current case (semi form verification)
 */
export type CertainErrorName =
  | 'CustomError'
  | 'AxiosError'
  | 'ApiError'
  | 'ChunkLoadError'
  | 'notInstanceError';
