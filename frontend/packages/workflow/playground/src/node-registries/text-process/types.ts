import {
  type InputValueVO,
  type NodeDataDTO,
  type ViewVariableMeta,
  type BlockInput,
  type VariableMetaDTO,
} from '@coze-workflow/base';

import { type StringMethod } from './constants';

export interface NodeMeta {
  title: string;
  icon: string;
  subTitle: string;
  description: string;
  mainColor: string;
}

/** option */
export interface DelimiterOption {
  label: string;
  value: string;
  isDefault: boolean;
}

/** form basic data */
export interface FormData {
  method: StringMethod;
  inputParameters: InputValueVO[];
  nodeMeta: NodeMeta;
  outputs: ViewVariableMeta[];
}

/** String split mode form data */
export interface DelimiterModeFormData extends FormData {
  delimiter: {
    value: string[];
    options: DelimiterOption[];
  };
}

/** String Splice mode form data */
export interface ConcatModeFormData extends FormData {
  concatChar: {
    value: string;
    options: DelimiterOption[];
  };
  concatResult: string;
}

/** backend data structure */
export interface BackendData extends NodeDataDTO {
  nodeMeta: NodeMeta;
  inputs: NodeDataDTO['inputs'] & {
    // segmentation parameter
    method?: StringMethod;
    splitParams?: BlockInput[];

    // Splicing parameters
    concatParams?: BlockInput[];
  };
  outputs: VariableMetaDTO[];
}

/** Intermediate data structure, which converts the variable structure into a back-end structure */
export interface DataBeforeFormat {
  inputs: BackendData['inputs'] & {
    // This will be handled further workflow-json-format, see formatNodeOnSubmit method
    inputParameters?: InputValueVO[];
  };
  nodeMeta: NodeMeta;

  // This will be handled further workflow-json-format, see formatNodeOnSubmit method
  outputs: ViewVariableMeta[];
}
