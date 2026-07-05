import {
  type Log,
  type ConditionLog,
  type OutputLog,
  type BaseLog,
  type FunctionCallLog,
  type WorkflowLinkLog,
} from '../types';
import { LogType } from '../constants';

/** Is it an output log? */
export const isOutputLog = (log: Log): log is OutputLog =>
  log.type === LogType.Output;

/** Is it condition input? */
export const isConditionLog = (log: Log): log is ConditionLog =>
  log.type === LogType.Condition;

/** Is it a large model inference log? */
export const isReasoningLog = (log: Log): log is BaseLog =>
  log.type === LogType.Reasoning;

export const isFunctionCallLog = (log: Log): log is FunctionCallLog =>
  log.type === LogType.FunctionCall;

/** Is it a subprocess jump connection? */
export const isWorkflowLinkLog = (log: Log): log is WorkflowLinkLog =>
  log.type === LogType.WorkflowLink;
