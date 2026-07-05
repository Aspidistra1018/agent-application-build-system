import { type FeedbackConfig } from '@/types/client';

export const isShowFeedback = (feedback?: FeedbackConfig) =>
  feedback &&
  feedback?.isNeedFeedback &&
  feedback.feedbackPanel?.tags?.filter(item => !!item.label).length;
