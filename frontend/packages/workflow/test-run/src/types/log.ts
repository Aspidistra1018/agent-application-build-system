/** Possible values in the log */
export type LogValueType =
  | string
  | null
  | number
  | object
  | boolean
  | undefined;

interface MockInfo {
  isHit: boolean;
  mockSetName?: string;
}

/** Normal log structure */
export interface BaseLog {
  label: string;
  source: LogValueType;
  data: LogValueType;
  copyTooltip?: string;
  mockInfo?: MockInfo;
  type: 'input' | 'output' | 'raw_output' | 'batch';
}
/** Log structure for conditions */
export interface ConditionLog {
  conditions: Array<{
    conditions: {
      leftData: LogValueType;
      rightData: LogValueType;
      operatorData: string;
    }[];
    name: string;
    logic: number;
    logicData: string;
  }>;
}

/** Nested log structure */
export interface TreeLog {
  label: string;
  children: (BaseLog | ConditionLog)[];
}

export type Log = BaseLog | ConditionLog | TreeLog;

/** Formatted condition log */
export interface ConditionFormatLog {
  leftData: LogValueType;
  rightData: LogValueType;
  operatorData: string;
}

export interface WorkflowLinkLogData {
  workflowId: string;
  executeId: string;
  subExecuteId: string;
}
