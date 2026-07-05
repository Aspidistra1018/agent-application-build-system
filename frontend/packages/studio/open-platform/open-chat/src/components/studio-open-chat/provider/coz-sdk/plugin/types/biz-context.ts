export interface PluginBizContext {
  refreshToken?: () => Promise<string>;
  regenerateMessageByUserMessageId: (messageId: string) => void;
}
