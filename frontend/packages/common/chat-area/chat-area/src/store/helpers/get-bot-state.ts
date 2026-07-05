import { type MessageExtraInfoBotState } from '../types';
import { safeJSONParse } from '../../utils/safe-json-parse';

// The members in botState are all optional, and the shape is guaranteed to be {}
const isBotState = (value: unknown): value is MessageExtraInfoBotState =>
  typeof value === 'object' && value !== null;

// Todo should note the difference between this method and the getMessageBotStateFromStringifyObject under stores/socket
export const getBotState = (
  stringifyBotState?: string,
): MessageExtraInfoBotState => {
  const result = safeJSONParse(stringifyBotState);
  if (isBotState(result)) {
    return result;
  }
  return {};
};
