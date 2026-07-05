import { type MouseEvent } from 'react';

import {
  type IEventCallbacks,
  type IOnLinkClickParams,
} from '@coze-common/chat-uikit-shared';
import { type MessageBoxTheme } from '@coze-common/chat-uikit';
import {
  type ClearMessageContextParams,
  type SendMessageOptions,
  type ContentType,
  type Message,
  type ChatCoreError,
  type GetHistoryMessageResponse,
} from '@coze-common/chat-core';

import {
  type Message as BuiltInMessage,
  type MessageGroup,
} from '../../store/types';

export type SendMessageFrom =
  | 'regenerate'
  | 'suggestion'
  | 'inputAndSend'
  | 'clickCard'
  | 'shortcut'
  | 'other'
  | 'plugin';

export interface MessageCallbackParams {
  message: Message<ContentType>;
  options?: SendMessageOptions;
}

export type SendMessageCallback = (
  params: MessageCallbackParams,
  from: SendMessageFrom,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- why is the upper layer inferred as void when used
) => MessageCallbackParams | void;

export type SendMessageFailedCallback = (
  params: MessageCallbackParams,
  from: SendMessageFrom,
  error: unknown,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- why is the upper layer inferred as void when used
) => MessageCallbackParams | void;

export type MessageCallback = (
  params: MessageCallbackParams,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- why is the upper layer inferred as void when used
) => MessageCallbackParams | void;

export interface SelectionChangeParams {
  messageList: BuiltInMessage[];
  replyIdList: string[];
  checkedLength: number;
  isAllChecked: boolean;
}

export type SelectionChangeCallback = (params: SelectionChangeParams) => void;

export interface OnboardingSelectChangeParams {
  onboarding: Partial<{
    prologue: string;
  }>;
  selectedId: string | null;
}

export type OnboardingSelectChangeCallback = (
  params: OnboardingSelectChangeParams,
  isAlreadyHasSelect: boolean,
) => void;
/**
 * Events sent externally by ChatArea
 * external response
 */
export interface ChatAreaLifeCycleEventMap {
  onInitSuccess: () => void;
  onInitError: () => void;
  onDestroy: () => void;
  /**
   * @param params frozen
   */
  onBeforeMessageSend: SendMessageCallback;
  onMessageSendFail: SendMessageFailedCallback;
  onMessageSendSuccess: SendMessageCallback;
  onReceiveMessage: MessageCallback;
  onDeleteMessage: (params: { messageGroup: MessageGroup }) => void;
  onMessageSuccess: (params: {
    replyId: string;
    localMessageId: string;
  }) => void;
  onMessageError: (params: {
    replyId: string;
    localMessageId: string;
    error: ChatCoreError | undefined;
  }) => void;
  onBeforeMessageGroupListUpdate: (
    messageGroupList: MessageGroup[],
    messages: BuiltInMessage[],
  ) => MessageGroup[];
  onClearContextError: () => void;
  onBeforeLoadMoreInsertMessages: (params: {
    data: GetHistoryMessageResponse;
  }) => void;
  onAfterStopResponding: OnAfterStopRespondingCallback;
  /**
   * @Deprecated temporary use, consider switching implementation later
   */
  onParseReceiveMessageBoxTheme?: OnParseReceiveMessageBoxTheme;
}

export type OnParseReceiveMessageBoxTheme = (param: {
  message: Message<ContentType>;
}) => MessageBoxTheme | undefined;

export type OnAfterStopRespondingCallback = (params: {
  brokenReplyId: string;
  brokenFlattenMessageGroup: BuiltInMessage[] | null;
}) => void;

export interface ChatAreaMessageEventMap {
  onClearHistoryBefore: () => void;
  onClearHistoryAfter: () => void;
  onClearContextBefore: (
    params: ClearMessageContextParams,
  ) => ClearMessageContextParams;
  onClearContextAfter: () => void;
  onSelectionChange: SelectionChangeCallback;
  onInputClick: () => void;
  onOnboardingSelectChange: OnboardingSelectChangeCallback;
  onImageClick: (extra: { url: string }) => void;
  onMessageBottomShow: (message: Message<ContentType>) => void;
  onMessageLinkClick: (
    params: IOnLinkClickParams,
    event: MouseEvent<Element, globalThis.MouseEvent>,
  ) => void;
  onBeforeStopResponding: () => void;
  onCopyUpload: IEventCallbacks['onCopyUpload'];
}

export type ChatAreaEventCallback = Partial<ChatAreaLifeCycleEventMap> &
  Partial<ChatAreaMessageEventMap>;
