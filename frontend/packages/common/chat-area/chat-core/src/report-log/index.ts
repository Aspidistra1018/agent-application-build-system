import {
  logger,
  reporter,
  type Logger,
  type Reporter,
} from '@coze-arch/logger';

import { getSlardarEnv } from '../shared/utils/env';
import { type DeployVersion, type ENV } from '../shared/const';
import { slardarInstance, createSlardarConfig } from './slardar';
import { LogOptionsHelper } from './log-options-helper';

// Get the instance type of the ReportLog class
type ReportLogInstance = InstanceType<typeof ReportLog>;

// Get the return type of the slardarTracer method
type SlardarTracerReturnType = ReturnType<ReportLogInstance['slardarTracer']>;

// Gets the type of the trace method
export type Tracer = SlardarTracerReturnType['trace'];

export type ReportLogType = 'error' | 'info';
/**
 * log report
 */

export interface ReportLogProps {
  // Back level report, including previous level log
  logLevel?: 'disable' | 'error' | 'info';
  env?: ENV;
  namespace?: string;
  scope?: string;
  meta?: Record<string, unknown>;
  deployVersion?: DeployVersion;
}

const defaultReportLogProps: {
  env: ENV;
  logLevel: 'disable' | 'error' | 'info';
  deployVersion: DeployVersion;
} = {
  env: 'production',
  deployVersion: 'release',
  logLevel: 'error',
};

/**
 * Namespace cannot be overridden
 */
const unChangeProps = {
  namespace: 'chat-core',
  meta: {},
};

export class ReportLog {
  ctx: LogOptionsHelper<ReportLogProps>;

  private hasSlardarInitd = false;

  private loggerWithBaseInfo!: Logger;

  private reportLogWithBaseInfo!: Reporter;

  constructor(props?: ReportLogProps) {
    const options = LogOptionsHelper.merge(props || {}, unChangeProps);
    this.ctx = new LogOptionsHelper(options);
    this.initLog(options);
    this.initReport(options);
  }

  /**
   * Instance initialization, all scopes are initialized only once
   */
  init() {
    console.log('debugger slardar instance init', this.hasSlardarInitd);
    if (this.hasSlardarInitd) {
      return;
    }
    this.hasSlardarInitd = true;
    const options = this.ctx.get();
    slardarInstance.init(
      createSlardarConfig({
        env: getSlardarEnv({
          env: options?.env || defaultReportLogProps.env,
          deployVersion:
            options?.deployVersion || defaultReportLogProps.deployVersion,
        }),
      }),
    );
    slardarInstance.start();
  }

  createLoggerWith(options?: ReportLogProps) {
    return new ReportLog(this.resolveCloneParams(options || {}));
  }

  private resolveCloneParams(props: ReportLogProps) {
    return LogOptionsHelper.merge(this.ctx.get(), props);
  }

  /**
   * slardar initialization
   */
  private initReport(options?: ReportLogProps) {
    this.reportLogWithBaseInfo = reporter.createReporterWithPreset(
      this.resolveCloneParams(options || {}),
    );
    this.reportLogWithBaseInfo.init(slardarInstance);
  }

  /**
   *  Console log initialization
   * @param options
   */
  private initLog(options?: ReportLogProps) {
    this.loggerWithBaseInfo = logger.createLoggerWith({
      ctx: this.resolveCloneParams(options || {}),
    });
  }

  // Determine whether to report
  private isNeedReport(logType: ReportLogType) {
    const { logLevel } = this.ctx.get();
    if (logLevel === 'disable') {
      return false;
    }
    if (logLevel === 'error') {
      return logType === 'error';
    }
    return true;
  }

  info(...args: Parameters<typeof logger.info>) {
    if (!this.isNeedReport('info')) {
      return;
    }
    this.loggerWithBaseInfo.info(...args);
  }

  error(...args: Parameters<typeof logger.error>) {
    if (!this.isNeedReport('error')) {
      return;
    }
    this.loggerWithBaseInfo.error(...args);
  }

  /**
   * Slardar log info hierarchy
   */
  slardarInfo(...args: Parameters<typeof reporter.info>) {
    this.reportLogWithBaseInfo.info(...args);
  }

  /**
   * Slardar log success level
   * @param args
   */
  slardarSuccess(...args: Parameters<typeof reporter.success>) {
    this.reportLogWithBaseInfo.success(...args);
  }

  /**
   * Slardar log, error level
   */
  slardarError(...args: Parameters<typeof reporter.error>) {
    this.reportLogWithBaseInfo.error(...args);
  }

  /**
   * Slardar custom events for event statistics
   */
  slardarEvent(...args: Parameters<typeof reporter.event>) {
    this.reportLogWithBaseInfo.event(...args);
  }

  /**
   * Slardar custom success events for event statistics
   */
  slardarSuccessEvent(...args: Parameters<typeof reporter.event>) {
    this.reportLogWithBaseInfo.successEvent(...args);
  }

  /**
   * Slardar custom error event, for event statistics, with error type information
   */
  slardarErrorEvent(...args: Parameters<typeof reporter.errorEvent>) {
    this.reportLogWithBaseInfo.errorEvent(...args);
  }

  /**
   * Event tracking for link performance statistics
   */
  slardarTracer(...args: Parameters<typeof reporter.tracer>) {
    return this.reportLogWithBaseInfo.tracer(...args);
  }
}
