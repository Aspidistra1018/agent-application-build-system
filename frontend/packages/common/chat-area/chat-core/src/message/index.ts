/**
 * 1. Responsible for standardizing imported parameters exported parameters of various types of message creation to reduce message creation costs
 * 2. For the received message, spit out the specified message format for different message types
 */

export { PreSendLocalMessageFactory } from './presend-local-message/presend-local-message-factory';

export { ChunkProcessor } from './chunk-processor';

export { PreSendLocalMessage } from './presend-local-message/presend-local-message';
