import type { CSSProperties } from 'react';

import type { SetterComponentProps } from '@flowgram-adapter/free-layout-editor';
import type { WorkflowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import type { RefExpression } from '@coze-workflow/base';

export type NodeInputNameFormat = (params: {
  name: string;
  prefix: string;
  suffix: string;
  input: RefExpression;
  node: WorkflowNodeEntity;
}) => string;

export type NodeInputNameProps = SetterComponentProps & {
  readonly?: boolean;
  initValidate?: boolean;
  isPureText?: boolean;
  style?: CSSProperties;
  /** Variable expressions at the same level */
  input?: RefExpression;
  /** All input items in the current input list */
  inputParameters?: Array<{
    name: string;
    input: RefExpression;
  }>;
  /** prefix */
  prefix?: string;
  /** suffix */
  suffix?: string;
  /** Name custom formatting */
  format?: NodeInputNameFormat;
  tooltip?: string;
};
