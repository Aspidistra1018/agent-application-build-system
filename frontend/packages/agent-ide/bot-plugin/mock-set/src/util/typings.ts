import { type MockRule } from '@coze-arch/bot-api/debugger_api';

export enum MockDataValueType {
  STRING = 'string',
  INTEGER = 'integer',
  NUMBER = 'number',
  OBJECT = 'object',
  ARRAY = 'array',
  BOOLEAN = 'boolean',
}

export enum MockDataStatus {
  DEFAULT = 'default',
  REMOVED = 'removed',
  ADDED = 'added',
}

export interface MockDataWithStatus {
  /** key */
  key: string;
  /**  field name */
  label: string;
  /**  field value */
  realValue?: string | number | boolean;
  /**  display use */
  displayValue?: string;
  /**  describe */
  description?: string;
  /**  Is it required? */
  isRequired: boolean;
  /**  field data type */
  type: MockDataValueType;
  /**  for array */
  childrenType?: MockDataValueType;
  /**  Field Status */
  status: MockDataStatus;
  /**  Field sub-node */
  children?: MockDataWithStatus[];
}

export interface MockDataInfo {
  schema?: string;
  mock?: MockRule;
  mergedResultExample?: string;
  incompatible?: boolean;
}
