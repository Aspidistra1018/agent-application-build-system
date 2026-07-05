export interface ChatProviderFunc {
  regenerateMessageByUserMessageId: (id: string) => void;
  setConversationId: (id: string, sectionId: string) => void;
  getConversationId: () => string;
  getSectionId: () => string;
}
