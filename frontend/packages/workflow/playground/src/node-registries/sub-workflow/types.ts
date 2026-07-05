import {
  type InputValueVO,
  type ViewVariableMeta,
  type VariableMetaDTO,
  type InputValueDTO,
  type BatchVO,
  type BatchDTO,
  type ValueExpression,
  type ReleasedWorkflow,
  type WorkflowDetailInfoData,
  type DTODefine,
} from '@coze-workflow/base';

import type { NodeMeta, SettingOnErrorDTO, SettingOnErrorVO } from '@/typing';

export interface FormData {
  inputs: { inputParameters: InputValueVO[] };
}

interface BaseInputsOutputsType {
  inputs: DTODefine.InputVariableDTO[]; // name, type, schema, required, description
  outputs: VariableMetaDTO[];
}

export interface Identifier {
  workflowId: string;
  workflowVersion: string;
}

export type SubWorkflowDetailDTO =
  | (ReleasedWorkflow & BaseInputsOutputsType)
  | (WorkflowDetailInfoData & BaseInputsOutputsType);

// The type corresponding to the input parameter, but it should be noted that the value of the custom extended field does not necessarily have to be the ValueExpression type
export type InputParametersMap = Record<string, ValueExpression>;

/** subprocess node front-end form structure */
export interface SubWorkflowNodeFormData {
  nodeMeta: NodeMeta;
  inputs: {
    inputDefs?: SubWorkflowDetailDTO['inputs'][]; // name, required, type, defaultValue, schema...
    inputParameters?: InputParametersMap;
    batch?: BatchVO;
    batchMode?: string;
    settingOnError?: SettingOnErrorDTO;
    workflowId?: string;
    workflowVersion?: string;
  };
  outputs: ViewVariableMeta[];
  settingOnError?: SettingOnErrorVO;
}

/**
 * Subprocess node data part structure definition
 */
export interface SubWorkflowNodeDTOData<
  InputType = InputValueDTO,
  OutputType = VariableMetaDTO,
> {
  nodeMeta: NodeMeta;
  inputs: {
    // Here's an example.
    // {
    //   "input": {},
    //   "name": "obj",
    //   "required": false,
    //   "schema": [
    //     {
    //       "name": "arr_str",
    //       "required": false,
    //       "schema": {
    //         "type": "string"
    //       },
    //       "type": "list"
    //     },
    //     {
    //       "name": "int",
    //       "required": false,
    //       "type": "integer"
    //     }
    //   ],
    //   "type": "object"
    // }
    inputDefs?: SubWorkflowDetailDTO['inputs'][];
    inputParameters?: InputType[];
    batch?: BatchDTO & { batchEnable: boolean };
    batchMode?: string;
    settingOnError?: SettingOnErrorDTO;

    // Some additional parameters
    spaceId?: string;
    type?: number;
    workflowId?: string;
    workflowVersion?: string;
  };
  outputs: OutputType[];
}

/**
 * Subprocess node data part structure definition, data structure after workflow-json-format transformation
 * - outputs converted from VariableMetaDTO to ViewVariableMeta
 * - Inputs.inputParameters converted from BlockInput to InputValueVO
 */
export type SubWorkflowNodeDTODataWhenOnInit = SubWorkflowNodeDTOData<
  InputValueVO,
  ViewVariableMeta
>;
