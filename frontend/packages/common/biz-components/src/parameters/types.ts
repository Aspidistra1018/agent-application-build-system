export enum ParamTypeAlias {
  String = 1,
  Integer,
  Boolean,
  Number,
  /** Theoretically there is no List, this item is only for compatibility */
  List = 5,
  Object = 6,
  // The above is the InputType defined in the api. The following is the integrated one. Start from 99 to avoid collisions with the backend definition.
  ArrayString = 99,
  ArrayInteger,
  ArrayBoolean,
  ArrayNumber,
  ArrayObject,
}

export const PARAM_TYPE_ALIAS_MAP: Record<ParamTypeAlias, string> = {
  [ParamTypeAlias.String]: 'String',
  [ParamTypeAlias.Integer]: 'Integer',
  [ParamTypeAlias.Boolean]: 'Boolean',
  [ParamTypeAlias.Number]: 'Number',
  [ParamTypeAlias.List]: 'List',
  [ParamTypeAlias.Object]: 'Object',
  [ParamTypeAlias.ArrayString]: 'Array<String>',
  [ParamTypeAlias.ArrayInteger]: 'Array<Integer>',
  [ParamTypeAlias.ArrayBoolean]: 'Array<Boolean>',
  [ParamTypeAlias.ArrayNumber]: 'Array<Number>',
  [ParamTypeAlias.ArrayObject]: 'Array<Object>',
};

export enum ParamValueType {
  QUOTE = 'quote',
  FIXED = 'fixed',
}

export interface RecursedParamDefinition {
  name?: string;
  /** The Tree component requires each node to have a key, and the key is not suitable for assignment in any way such as name (before and after). Finally, the interface conversion layer provides a random key at one time. */
  fieldRandomKey?: string;
  desc?: string;
  required?: boolean;
  type: ParamTypeAlias;
  children?: RecursedParamDefinition[];
  // Region parameter value definition
  // The value of the input parameter can come from an upstream variable reference, or it can be a fixed value entered by the user (for complex types, only references are allowed).
  // If it is a fixed value, pass the fixedValue.
  // If it is a reference, pass the quotedValue.
  isQuote?: ParamValueType;
  /** parameter setting */
  fixedValue?: string;
  /** parameter reference */
  quotedValue?: [nodeId: string, ...path: string[]]; // string[]
  // endregion
}

export interface ParameterValue {
  key: string;
  name?: string;
  type: ParamTypeAlias;
  description?: string;
  children?: ParameterValue[];
}

export interface ParametersError {
  path: string;
  message: string;
}

export interface ParametersProps {
  value: Array<ParameterValue>;
  onChange?: (value: Array<ParameterValue>) => void;
  readonly?: boolean;
  className?: string;
  style?: React.CSSProperties;
  withDescription?: boolean;
  // Types not supported
  disabledTypes?: ParamTypeAlias[];
  errors?: ParametersError[];
  // Support null value & empty array
  allowValueEmpty?: boolean;
}
