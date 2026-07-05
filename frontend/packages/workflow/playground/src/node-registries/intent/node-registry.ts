import {
  DEFAULT_NODE_META_PATH,
  DEFAULT_NODE_SIZE,
  DEFAULT_OUTPUTS_PATH,
} from '@coze-workflow/nodes';
import {
  StandardNodeType,
  type WorkflowNodeRegistry,
} from '@coze-workflow/base';

import { type NodeTestMeta } from '@/test-run-kit';

import { test } from './node-test';
import { INTENT_FORM_META } from './form-meta';
import { INPUT_PATH } from './constants';

export const INTENT_NODE_REGISTRY: WorkflowNodeRegistry<NodeTestMeta> = {
  type: StandardNodeType.Intent,
  meta: {
    nodeDTOType: StandardNodeType.Intent,
    size: { width: DEFAULT_NODE_SIZE.width, height: 156.7 },
    nodeMetaPath: DEFAULT_NODE_META_PATH,
    outputsPath: DEFAULT_OUTPUTS_PATH,
    inputParametersPath: INPUT_PATH, // Imported parameter path, practice running and other functions rely on this path to extract parameters
    useDynamicPort: true,
    getLLMModelIdsByNodeJSON: nodeJSON =>
      nodeJSON?.data?.inputs?.llmParam?.modelType,
    defaultPorts: [{ type: 'input' }],
    test,
    helpLink: '/open/docs/guides/intent_recognition_node',
  },
  formMeta: INTENT_FORM_META,
};
