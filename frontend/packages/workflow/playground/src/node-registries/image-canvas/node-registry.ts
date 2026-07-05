import {
  DEFAULT_NODE_META_PATH,
  DEFAULT_OUTPUTS_PATH,
} from '@coze-workflow/nodes';
import {
  StandardNodeType,
  type WorkflowNodeRegistry,
} from '@coze-workflow/base';

import { type NodeTestMeta } from '@/test-run-kit';

import { test } from './node-test';
import { IMAGE_CANVAS_FORM_META } from './form-meta';
import { INPUT_PATH } from './constants';

export const IMAGE_CANVAS_NODE_REGISTRY: WorkflowNodeRegistry<NodeTestMeta> = {
  type: StandardNodeType.ImageCanvas,
  meta: {
    nodeDTOType: StandardNodeType.ImageCanvas,
    size: { width: 360, height: 130.7 },
    nodeMetaPath: DEFAULT_NODE_META_PATH,
    outputsPath: DEFAULT_OUTPUTS_PATH,
    inputParametersPath: INPUT_PATH, // Imported parameter path, practice running and other functions rely on this path to extract parameters
    test,
    helpLink: '/open/docs/guides/canvas_node',
  },
  formMeta: IMAGE_CANVAS_FORM_META,
  variablesMeta: {
    inputsPathList: [],
    outputsPathList: ['outputs'],
  },
};
