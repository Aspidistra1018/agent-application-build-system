import { type CSpan } from './cspan';

export enum DataSourceTypeEnum {
  SpanData = 'SpanData',
  TraceId = 'TraceId',
}

export interface DataSource {
  // When the value is traceId, the component queries SpanData based on traceId.
  type: DataSourceTypeEnum;
  spanData?: CSpan[]; // When type is spanData, unique fields
  traceId?: string; // When type is traceId, unique field
}
