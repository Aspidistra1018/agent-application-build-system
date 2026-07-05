export {
  ComponentAdapterCommonProps,
  TestFormSchema,
  FormDataType,
  TestFormField,
  TestFormDefaultValue,
} from './test-form';

/*******************************************************************************
 * Log related types
 */

/** Type of condition rvalue */
export enum ConditionRightType {
  Ref = 'ref',
  Literal = 'literal',
}

/** Possible values in the log */
export type LogValueType =
  | string
  | null
  | number
  | object
  | boolean
  | undefined;

/** Formatted condition log */
export interface ConditionLog {
  leftData: LogValueType;
  rightData: LogValueType;
  operatorData: string;
}
/** Formatted log */
export interface Log {
  input:
    | {
        source: LogValueType;
        data: LogValueType;
      }
    | ConditionLog[];
  output: {
    source: LogValueType;
    data: LogValueType;
    rawSource: LogValueType;
    rawData: LogValueType;
  };
}
