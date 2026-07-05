import type { CSSProperties } from 'react';

import type { InputValueVO, RefExpression } from '@coze-workflow/base';
import { type InputProps } from '@coze-arch/coze-design';

import { type ComponentProps } from '@/nodes-v2/components/types';

export type NodeInputNameFormat = (params: {
  name: string;
  prefix: string;
  suffix: string;
  input: RefExpression;
  // context: SetterOrDecoratorContext;
}) => string;

export type NodeInputNameProps = Omit<
  ComponentProps<string>,
  'inputParameters'
> & {
  readonly?: boolean;
  initValidate?: boolean;
  isPureText?: boolean;
  style?: CSSProperties;
  /** Variable expressions at the same level */
  input: RefExpression;
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
  inputPrefix?: InputProps['prefix'];
  disabled?: boolean;
};
