export enum HttpChunkEvents {
  // Received message
  MESSAGE_RECEIVED = 'http_chunk_message_received',
  // Abnormal message received
  MESSAGE_RECEIVED_INVALID = 'http_chunk_message_received_invalid',
  // overall pull timeout
  TOTAL_FETCH_TIMEOUT = 'http_chunk_total_fetch_timeout',
  // Private room timeout
  BETWEEN_CHUNK_TIMEOUT = 'http_chunk_between_chunk_timeout',
  // Start fetching
  FETCH_START = 'http_chunk_fetch_start',
  // Fetch request successful
  FETCH_SUCCESS = 'http_chunk_fetch_success',
  // Fetch request exception
  FETCH_ERROR = 'http_chunk_fetch_error',
  // Invalid message format
  INVALID_MESSAGE = 'http_chunk_invalid_message',
  // Pull flow starts
  READ_STREAM_START = 'http_chunk_read_stream_start',
  // Pull flow anomaly
  READ_STREAM_ERROR = 'http_chunk_read_stream_error',
  // Fetch to read stream full success
  ALL_SUCCESS = 'http_chunk_all_success',
}
