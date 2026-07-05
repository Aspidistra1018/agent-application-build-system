/* eslint-disable @typescript-eslint/method-signature-style */
import { type MaybePromise } from '@flowgram-adapter/common';

export const LifecycleContribution = Symbol('LifecycleContribution');
/**
 * IDE Global Lifecycle Registration
 */
export interface LifecycleContribution {
  /**
   * IDE registration phase
   */
  onInit?(): void;
  /**
   * IDE loading phase, generally used to load global configuration, such as i18n data
   */
  onLoading?(): MaybePromise<void>;
  /**
   * IDE layout initialization phase, executed after onLoading
   */
  onLayoutInit?(): MaybePromise<void>;
  /**
   * The IDE starts to execute and the business logic can be loaded
   */
  onStart?(): MaybePromise<void>;
  /**
   * Execute before the browser'beforeunload ', if it returns true, it will be blocked
   */
  onWillDispose?(): boolean | void;
  /**
   * IDE destruction
   */
  onDispose?(): void;
}
