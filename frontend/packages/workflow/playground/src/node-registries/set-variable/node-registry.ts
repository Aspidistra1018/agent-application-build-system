import {
  DEFAULT_NODE_META_PATH,
  DEFAULT_OUTPUTS_PATH,
} from '@coze-workflow/nodes';
import {
  StandardNodeType,
  type WorkflowNodeRegistry,
} from '@coze-workflow/base';

import { SET_VARIABLE_FORM_META } from './form-meta';
import { INPUT_PATH } from './constants';

export const SET_VARIABLE_NODE_REGISTRY: WorkflowNodeRegistry = {
  type: StandardNodeType.SetVariable,
  meta: {
    hideTest: true,
    nodeDTOType: StandardNodeType.SetVariable,
    size: { width: 360, height: 87.86 },
    nodeMetaPath: DEFAULT_NODE_META_PATH,
    outputsPath: DEFAULT_OUTPUTS_PATH,
    inputParametersPath: INPUT_PATH, // Imported parameter path, practice running and other functions rely on this path to extract parameters
  },
  variablesMeta: {
    outputsPathList: [],
    inputsPathList: [],
  },
  formMeta: SET_VARIABLE_FORM_META,
};
