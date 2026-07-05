import {
  type ViewVariableMeta,
  type NodeDataDTO as BaseNodeDataDTO,
} from '@coze-workflow/base';
export type FormData = {
  outputs: ViewVariableMeta[];
} & Pick<BaseNodeDataDTO, 'nodeMeta'>;

export type NodeDataDTO = {
  inputs: {
    // Output parameter type information JSON.stringify (VariableMetaDTO [])
    outputSchema: string;
  };
} & Pick<BaseNodeDataDTO, 'outputs' | 'nodeMeta'>;
