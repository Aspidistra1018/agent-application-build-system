import {
  type ComponentType,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

import {
  type IContentConfigs,
  type GetBotInfo,
  type IEventCallbacks,
  type Layout,
} from '@coze-common/chat-uikit-shared';
import { type SuggestedQuestionsShowMode } from '@coze-arch/bot-api/developer_api';

import {
  type MessageMeta,
  type Message,
  type MessageGroup,
  type OnboardingSuggestionItem,
} from '../store/types';
import { type ChatInputIntegrationController } from './chat-input-integration';

export interface MessageBoxUserInfo {
  nickname?: string;
  avatar?: string;
}

export interface MessageBoxProps {
  message: Message;
  meta: MessageMeta;
  isMessageGroupFirstMessage?: boolean;
  isMessageGroupLastMessage?: boolean;
  renderFooter?: (refreshContainerWidth: () => void) => React.ReactNode;
  /** Components displayed while the mouse is hovering */
  hoverContent?: React.ReactNode;
  children?: React.ReactNode;
  readonly?: boolean;
  getBotInfo: GetBotInfo;
  layout: Layout;
  showBackground: boolean;
  /**
   * Upper right slot
   */
  topRightSlot?: React.ReactNode;
  /*
   * Turn on the picture auto-resizing.
   */
  enableImageAutoSize?: boolean;
  /**
   * Image auto-resizing container width
   */
  imageAutoSizeContainerWidth?: number;
  eventCallbacks?: IEventCallbacks;
  onError?: (error: unknown) => void;
  isContentLoading?: boolean;
}

export type SendMessageBoxProps = MessageBoxProps;
export type ReceiveMessageBoxProps = MessageBoxProps;

export interface ContentBoxProps {
  message: Message;
  meta: MessageMeta;
  contentConfigs: IContentConfigs;
  getBotInfo: GetBotInfo;
  readonly: boolean;
  eventCallbacks?: IEventCallbacks;
  layout: Layout;
  showBackground: boolean;
  /**
   * Turn on the picture auto-resizing.
   */
  enableImageAutoSize?: boolean;
  /**
   * Image auto-resizing container width
   */
  isCardDisabled?: boolean;
  isContentLoading?: boolean;
}

interface MessageContentCommonProps {
  message: Message;
  meta: MessageMeta;
}
type TextMessageContentProps = MessageContentCommonProps;

type CardMessageContentProps = MessageContentCommonProps;

type ImageMessageContentProps = MessageContentCommonProps;

type FileMessageContentProps = MessageContentCommonProps;

export interface ComponentTypesMap {
  messageGroupWrapper: ComponentType<
    PropsWithChildren<{
      replyId?: string;
      messageGroup?: MessageGroup;
      deleteMessageGroup: () => Promise<void>;
      isSendingMessage: boolean;
    }>
  >;
  messageGroupBody: ComponentType<{
    messageGroup: MessageGroup;
    getBotInfo: GetBotInfo;
  }>;
  functionCallMessageBox: ComponentType<{
    functionCallMessageList: Message[];
    /**
     * Whether the conversation corresponding to the message is over, not interrupted, and the final answer is returned, regardless of whether it is suggested
     */
    isRelatedChatComplete: boolean;
    /**
     *  Whether the conversation corresponding to the message is a false interruption
     */
    isFakeInterruptAnswer: boolean;
    /**
     * Whether the message is from an ongoing conversation, as determined by respond.replyId
     */
    isMessageFromOngoingChat: boolean;
    getBotInfo: GetBotInfo;
  }>;
  messageActionBarFooter: ComponentType<{ refreshContainerWidth: () => void }>;
  messageActionBarHoverContent: ComponentType;
  // TODO: Components to be refined to message_type rendering
  receiveMessageBox: ComponentType<ReceiveMessageBoxProps>;
  receiveMessageBoxTopRightSlot: ComponentType;
  sendMessageBox: ComponentType<SendMessageBoxProps>;
  contentBox: ComponentType<ContentBoxProps>;
  textMessageContentBox: ComponentType<TextMessageContentProps>;
  cardMessageContent: ComponentType<CardMessageContentProps>;
  fileMessageContent: ComponentType<FileMessageContentProps>;
  imageMessageContent: ComponentType<ImageMessageContentProps>;

  onboarding: ComponentType<{
    hasMessages: boolean;
    prologue: string;
    suggestions: OnboardingSuggestionItem[];
    onboardingSuggestionsShowMode?: SuggestedQuestionsShowMode;
    sendTextMessage: (messageContent: string) => void;
    name?: string;
    avatar?: string;
    onOnboardingIdChange: (id: string) => void;
    readonly?: boolean;
    enableImageAutoSize?: boolean;
    showBackground?: boolean;
    imageAutoSizeContainerWidth?: number;
    eventCallbacks?: IEventCallbacks;
  }>;
  clearContextIcon: ComponentType;
  /**
   * Text box overall top add-on
   */
  inputAboveOutside: ComponentType;
  /**
   * Add-on inside text box
   */
  inputAddonTop: ComponentType;
  /**
   * Text box inside right slot
   */
  inputRightActions?: ComponentType;
  chatInputTooltip?: ComponentType;
  chatInputIntegration: {
    renderChatInputSlot?: (
      controller: ChatInputIntegrationController,
    ) => ReactNode;
    renderChatInputTopSlot?: (
      controller: ChatInputIntegrationController,
    ) => ReactNode;
  };
  messageFooterSlot: ComponentType[];
}
