import { type Message } from '../store/types';

const functionCallTypes: Message['type'][] = [
  'function_call',
  // Partial verbose is used to show intermediate states, like function_call
  'verbose',
  'tool_response',
  'knowledge',
];

export const getIsFunctionCallType = (type: Message['type']) =>
  functionCallTypes.includes(type);
