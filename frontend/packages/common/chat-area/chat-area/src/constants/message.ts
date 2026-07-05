import { type Message } from '../store/types';

export const FUNCTION_MESSAGE_TYPE_LIST: Message['type'][] = [
  'knowledge',
  'function_call',
  'tool_response',
  'verbose',
];
export const MESSAGE_LIST_SIZE = 15;

export const MARK_MESSAGE_READ_DEBOUNCE_INTERVAL = 500;
export const MARK_MESSAGE_READ_DEBOUNCE_MAX_WAIT = 3000;

export const LOAD_SILENTLY_MAX_NEW_ADDED_COUNT = 6;

// If the get_message_list is called more than 3 times in 5s, the request is queued, and the queuing interval is 1s.
export const LOAD_MORE_CALL_GET_HISTORY_LIST_TIME_WINDOW = 5000;
export const LOAD_MORE_CALL_GET_HISTORY_LIST_LIMIT = 3;
export const LOAD_MORE_CALL_GET_HISTORY_LIST_EXCEED_RATE_DELAY = 1000;

export const CURSOR_TO_LOAD_LATEST_MESSAGE = '0';
export const CURSOR_TO_LOAD_LAST_READ_MESSAGE = '-1';

export const LOAD_EAGERLY_LOAD_MESSAGE_COUNT = 20;
/** There is no mechanism to do multi-page simultaneous loading, so the number of discarded policies is aligned with the eagerly maximum number of loads */
export const MIN_MESSAGE_INDEX_DIFF_TO_ABORT_CURRENT =
  LOAD_EAGERLY_LOAD_MESSAGE_COUNT - 1;

/** This value may be given when the server level has no reply_id */
export const SERVER_MESSAGE_REPLY_ID_PLACEHOLDER_VALUES = ['0', '-1'];
