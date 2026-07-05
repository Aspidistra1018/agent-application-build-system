import { type SuggestedQuestionsShowMode } from '@coze-arch/bot-api/playground_api';

export interface BotInputLengthConfig {
  /** Length of Agent Name */
  botName: number;
  /** Length of Agent Description */
  botDescription: number;
  /** Length of Agent's opening statement */
  onboarding: number;
  /** Agent, the length of a single opening line suggestion */
  onboardingSuggestion: number;
  /** User question Suggested custom prompt length */
  suggestionPrompt: number;
  /** Length of Project Name */
  projectName: number;
  /** Project Description Length */
  projectDescription: number;
}

export interface SuggestQuestionMessage {
  id: string;
  content: string;
  highlight?: boolean;
}
export interface WorkInfoOnboardingContent {
  prologue: string;
  suggested_questions: SuggestQuestionMessage[];
  suggested_questions_show_mode: SuggestedQuestionsShowMode;
}
