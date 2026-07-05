import {
  type SdkMessageEvent,
  type SdkPullingStatusEvent,
} from '@coze-common/chat-core';

import {
  type OnRefreshMessageListError,
  type OnAfterCallback,
  type OnAfterInitialContext,
} from '../../types/plugin-class/app-life-cycle';
import {
  ReadonlyLifeCycleService,
  WriteableLifeCycleService,
} from './life-cycle-service';

export interface OnBeforeListenChatCoreParam {
  onMessageUpdate: (evt: SdkMessageEvent) => void;
  onMessageStatusChange: (evt: SdkPullingStatusEvent) => void;
}

type OnBeforeListenChatCore = (
  ctx: OnBeforeListenChatCoreParam,
) => { abortListen: boolean } | undefined;

/**
 * ! Hope you noticed that the context information for the lifecycle is placed in ctx
 * ! If the judgment is just context, please pay attention to the convergence into ctx and do not add new parameters
 * ! Please pay attention here when CodeReview.
 */
export abstract class ReadonlyAppLifeCycleService<
  T = unknown,
  K = unknown,
> extends ReadonlyLifeCycleService<T, K> {
  /**
   * After PluginStore initialization
   * If you need support in the future, write it as void | Promise < void >
   */
  onAfterCreateStores?(stores: OnAfterCallback): void;
  /**
   * Before ChatArea is initialized (asynchronous calls are temporarily not supported, in Hooks)
   * If you need support in the future, write it as void | Promise < void >
   */
  onBeforeInitial?(): void;
  /**
   * After the ChatArea is initialized (successfully) (asynchronous calls are temporarily not supported, in Hooks)
   * If you need support in the future, write it as void | Promise < void >
   */
  onAfterInitial?(ctx: OnAfterInitialContext): void;
  /**
   * ChatArea initialization failed (asynchronous calls are temporarily not supported, in Hooks)
   * If you need support in the future, write it as void | Promise < void >
   */
  onInitialError?(): void;
  /**
   * Before ChatArea is destroyed (asynchronous calls are temporarily not supported, in Hooks)
   * If you need support in the future, write it as void | Promise < void >
   */
  onBeforeDestroy?(): void;
  /**
   * Before refreshing the message list
   */
  onBeforeRefreshMessageList?(): void;
  /**
   * After refreshing the message list
   */
  onAfterRefreshMessageList?(): void;
  /**
   * Failed to refresh message list
   */
  onRefreshMessageListError?(ctx: OnRefreshMessageListError): void;
  onBeforeListenChatCore?: OnBeforeListenChatCore;
}

export abstract class WriteableAppLifeCycleService<
  T = unknown,
  K = unknown,
> extends WriteableLifeCycleService<T, K> {
  /**
   * After PluginStore initialization
   * If you need support in the future, write it as void | Promise < void >
   */
  onAfterCreateStores?(stores: OnAfterCallback): void;
  /**
   * Before ChatArea is initialized (asynchronous calls are temporarily not supported, in Hooks)
   * If you need support in the future, write it as void | Promise < void >
   */
  onBeforeInitial?(): void;
  /**
   * After the ChatArea is initialized (successfully) (asynchronous calls are temporarily not supported, in Hooks)
   * If you need support in the future, write it as void | Promise < void >
   */
  onAfterInitial?(ctx: OnAfterInitialContext): void;
  /**
   * ChatArea initialization failed (asynchronous calls are temporarily not supported, in Hooks)
   * If you need support in the future, write it as void | Promise < void >
   */
  onInitialError?(): void;
  /**
   * Before ChatArea is destroyed (asynchronous calls are temporarily not supported, in Hooks)
   * If you need support in the future, write it as void | Promise < void >
   */
  onBeforeDestroy?(): void;
  /**
   * Before refreshing the message list
   */
  onBeforeRefreshMessageList?(): void;
  /**
   * After refreshing the message list
   */
  onAfterRefreshMessageList?(): void;
  /**
   * Failed to refresh message list
   */
  onRefreshMessageListError?(ctx: OnRefreshMessageListError): void;
  onBeforeListenChatCore?: OnBeforeListenChatCore;
}
