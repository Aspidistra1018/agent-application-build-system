import { BOT_USER_INPUT, CONVERSATION_NAME, USER_INPUT } from '../constants';
/**
 * Whether to preset the input parameters of the start node
 */
export const isPresetStartParams = (name?: string): boolean =>
  [BOT_USER_INPUT, USER_INPUT, CONVERSATION_NAME].includes(name ?? '');

/**
 * The Start node parameter is the user's input during BOT chat
 * @param name
 * @returns
 */
export const isUserInputStartParams = (name?: string): boolean =>
  [BOT_USER_INPUT, USER_INPUT].includes(name ?? '');
