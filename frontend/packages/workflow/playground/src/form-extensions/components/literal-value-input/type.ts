import { type CSSProperties } from 'react';

import { type SchemaObject } from 'ajv';
import {
  type LiteralExpression,
  type ViewVariableType,
} from '@coze-workflow/base';
import { type SelectProps } from '@coze-arch/coze-design';

export type LiteralValueType = LiteralExpression['content'] | null;
export type InputType = ViewVariableType;
export interface InputComponentRegistry {
  canHandle:
    | InputType
    | ((
        inputType: InputType,
        // dropdown box option list
        optionsList?: { label: string; value: string }[],
      ) => boolean);
  component: React.FC<LiteralValueInputProps>;
}
export interface LiteralValueInputProps {
  testId?: string;
  className?: string;
  defaultValue?: LiteralValueType;
  value?: LiteralValueType;
  inputType: InputType;
  readonly?: boolean;
  disabled?: boolean;
  onChange?: (value?: LiteralValueType) => void;
  onBlur?: (value?: LiteralValueType) => void;
  onFocus?: () => void;
  validateStatus?: SelectProps['validateStatus'];
  config?: {
    min?: number;
    max?: number;
    jsonSchema?: SchemaObject;
    // Drop-down box option list, according to this field to determine whether it needs to be rendered as a drop-down box
    optionsList?: { label: string; value: string }[];
    onRequestInputExpand?: (expand: boolean) => void;
  };
  placeholder?: string;
  style?: CSSProperties;
  componentRegistry?: InputComponentRegistry[];
}
