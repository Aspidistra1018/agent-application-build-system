export {
  totalConditionValueMap,
  ConditionRightType,
  logicTextMap,
} from './condition';

/** log type */
export enum LogType {
  /** input */
  Input,
  /** output */
  Output,
  /** batch data */
  Batch,
  /** Condition */
  Condition,
  /** Large model reasoning process */
  Reasoning,
  /** Large Model Function Process */
  FunctionCall,
  /** Subprocess jump connection */
  WorkflowLink,
}

export enum EndTerminalPlan {
  Variable = 1,
  Text = 2,
}
