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
import { TRIGGER_READ_FORM_META } from './form-meta';
import { INPUT_PATH } from './constants';

export const TRIGGER_READ_NODE_REGISTRY: WorkflowNodeRegistry<NodeTestMeta> = {
  type: StandardNodeType.TriggerRead,
  meta: {
    nodeDTOType: StandardNodeType.TriggerRead,
    size: { width: 360, height: 130.7 },
    nodeMetaPath: DEFAULT_NODE_META_PATH,
    outputsPath: DEFAULT_OUTPUTS_PATH,
    inputParametersPath: INPUT_PATH, // Imported parameter path, practice running and other functions rely on this path to extract parameters
    test,
    helpLink: '/open/docs/guides/query_timed_trigger',
  },
  variablesMeta: {
    inputsPathList: [],
    outputsPathList: ['outputs'],
  },
  formMeta: TRIGGER_READ_FORM_META,
};
