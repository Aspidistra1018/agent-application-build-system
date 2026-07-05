/* eslint-disable @stylistic/ts/comma-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type InitOptions } from 'i18next';

/**
 * Initialize Intl instance configuration parameters
 */
export interface IIntlInitOptions
  extends Omit<InitOptions, 'missingInterpolationHandler'> {
  /**
   * Whether the t method turns on the third parameter to cover the bottom
   * @default true
   */
  thirdParamFallback?: boolean;

  /**
   * Ignore all console output, do not recommend setting to true
   * @default false
   */
  ignoreWarning?: boolean;
}

export enum IntlModuleType {
  intl3rdParty = 'intl3rdParty',
  backend = 'backend',
  logger = 'logger',
  languageDetector = 'languageDetector',
  postProcessor = 'postProcessor',
  i18nFormat = 'i18nFormat',
  '3rdParty' = '3rdParty',
}

export interface IntlModule<
  T extends keyof typeof IntlModuleType = keyof typeof IntlModuleType,
> {
  type: T;
  name?: string;
  init?: (i18n: any) => void | Promise<any>;
}

export type TFunctionKeys = string | TemplateStringsArray;

export type TFunctionResult =
  | string
  | object
  | Array<string | object>
  | undefined
  | null;

export interface StringMap {
  [key: string]: any;
}
