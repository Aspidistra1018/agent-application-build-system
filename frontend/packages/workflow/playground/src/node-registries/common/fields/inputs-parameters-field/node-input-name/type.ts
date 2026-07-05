import type { CSSProperties } from 'react';

import type { WorkflowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import type { InputValueVO, ValueExpression } from '@coze-workflow/base';

export type NodeInputNameFormat = (params: {
  name: string;
  prefix: string;
  suffix: string;
  input: ValueExpression;
  node: WorkflowNodeEntity;
}) => string;

export interface NodeInputNameProps {
  readonly?: boolean;
  initValidate?: boolean;
  isPureText?: boolean;
  style?: CSSProperties;
  /** Variable expressions at the same level */
  input: ValueExpression;
  /** All input items in the current input list */
  inputParameters: Array<InputValueVO>;
  /** prefix */
  prefix?: string;
  /** suffix */
  suffix?: string;
  /** Name custom formatting */
  format?: NodeInputNameFormat;
  tooltip?: string;
  isError?: boolean;
  placeholder?: string;
}
