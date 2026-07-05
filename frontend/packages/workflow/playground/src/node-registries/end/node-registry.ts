import { DEFAULT_NODE_META_PATH } from '@coze-workflow/nodes';
import {
  StandardNodeType,
  type WorkflowNodeRegistry,
} from '@coze-workflow/base';

import { END_FORM_META } from './form-meta';
import { INPUT_PATH } from './constants';

export const END_NODE_REGISTRY: WorkflowNodeRegistry = {
  type: StandardNodeType.End,
  meta: {
    isNodeEnd: true,
    deleteDisable: true,
    copyDisable: true,
    headerReadonly: true,
    nodeDTOType: StandardNodeType.End,
    size: { width: 360, height: 78.2 },
    nodeMetaPath: DEFAULT_NODE_META_PATH,
    inputParametersPath: INPUT_PATH, // Imported parameter path, practice running and other functions rely on this path to extract parameters
    defaultPorts: [{ type: 'input' }],
    helpLink: '/open/docs/guides/start_end_node',
  },
  formMeta: END_FORM_META,
};
