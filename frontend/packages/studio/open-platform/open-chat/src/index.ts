// 应用的chat组件导出
export {
  BuilderChat,
  type BuilderChatRef,
  type IProject,
  type IWorkflow,
  type IBuilderChatProps,
} from './chat/builder-chat';

// WebSdk中 bot的chat组件导出
export { WebSdkChat } from './chat/web-sdk';

// 错误相关的方法和枚举值
export {
  isAuthError,
  OpenApiError,
  postErrorMessage,
  ChatSdkErrorType,
  type ChatSDKErrorData,
} from './util/error';
