export { reporter, Reporter } from './reporter';

// Reporter needs to report to slardar method export
export type {
  LoggerCommonProperties,
  CustomEvent,
  CustomErrorLog,
  CustomLog,
  ErrorEvent,
} from './reporter';
// Console printing
export { logger, LoggerContext, Logger } from './logger';

// ErrorBoundary related methods
export {
  ErrorBoundary,
  useErrorBoundary,
  useErrorHandler,
  type ErrorBoundaryProps,
  type FallbackProps,
} from './error-boundary';

export { SlardarReportClient, type SlardarInstance } from './slardar';

export { LogLevel } from './types';

export { getSlardarInstance, setUserInfoContext } from './slardar/runtime';
