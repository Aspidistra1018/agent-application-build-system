import { get } from 'lodash-es';
import { PluginType, StandardNodeType } from '@coze-workflow/base';
import { type WorkflowNodeEntity } from '@flowgram-adapter/free-layout-editor';

import {
  SETTING_ON_ERROR_DEFAULT_TIMEOUT,
  SETTING_ON_ERROR_MIN_TIMEOUT,
  SETTING_ON_ERROR_NODES_CONFIG,
} from '../constants';
import { WorkflowNodeData } from '../../entity-datas';

/**
 * Is it a side plug-in?
 * @param node
 * @returns
 */
const isLocalPlugin = (node?: WorkflowNodeEntity) => {
  if (!node) {
    return false;
  }

  const nodeDataEntity = node.getData<WorkflowNodeData>(WorkflowNodeData);
  const nodeData = nodeDataEntity?.getNodeData();

  return !!(
    node?.flowNodeType === StandardNodeType.Api &&
    get(nodeData, 'pluginType') === PluginType.LOCAL
  );
};

/**
 * Get node timeout configuration
 */
export const getTimeoutConfig = (
  node?: WorkflowNodeEntity,
): {
  max: number;
  default: number;
  min: number;
  init?: number;
  disabled: boolean;
} => {
  let timeoutConfig = SETTING_ON_ERROR_DEFAULT_TIMEOUT;

  if (
    node?.flowNodeType &&
    SETTING_ON_ERROR_NODES_CONFIG[node.flowNodeType]?.timeout
  ) {
    timeoutConfig = SETTING_ON_ERROR_NODES_CONFIG[node.flowNodeType].timeout;
  }

  return {
    ...timeoutConfig,
    min: SETTING_ON_ERROR_MIN_TIMEOUT,
    disabled: isLocalPlugin(node),
  };
};
