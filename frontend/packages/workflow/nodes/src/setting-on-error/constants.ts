/* eslint-disable @typescript-eslint/no-magic-numbers */
import { StandardNodeType } from '@coze-workflow/base';

/**
 * Nodes using V2 version exception settings
 */
export const SETTING_ON_ERROR_V2_NODES = [
  StandardNodeType.Code,
  StandardNodeType.LLM,
  StandardNodeType.Api,
  StandardNodeType.Database,
  StandardNodeType.ImageGenerate,
  StandardNodeType.DatabaseCreate,
  StandardNodeType.DatabaseUpdate,
  StandardNodeType.DatabaseQuery,
  StandardNodeType.DatabaseDelete,
  StandardNodeType.ImageCanvas,
  StandardNodeType.Intent,
];

/**
 * Version exception settings using V1
 */
export const SETTING_ON_ERROR_V1_NODES = [StandardNodeType.Http];

/**
 * Nodes with dynamic ports
 */
export const SETTING_ON_ERROR_DYNAMIC_PORT_NODES = [StandardNodeType.Intent];

/**
 * Open abnormal node
 */
export const SETTING_ON_ERROR_NODES = [
  ...SETTING_ON_ERROR_V1_NODES,
  ...SETTING_ON_ERROR_V2_NODES,
];

/**
 * abnormal port
 */
export const SETTING_ON_ERROR_PORT = 'branch_error';

/**
 * Timeout minimum 100ms;
 */
export const SETTING_ON_ERROR_MIN_TIMEOUT = 100;

/**
 * Other nodes: default 1 minute, maximum 1 minute;
 */
export const SETTING_ON_ERROR_DEFAULT_TIMEOUT = {
  default: 60 * 1000,
  max: 60 * 1000,
};

/**
 * Node configuration
 * LLM: Default 3 minutes, maximum 10 minutes;
 * Plugin: Default 3 minutes, maximum 3 minutes;
 */
export const SETTING_ON_ERROR_NODES_CONFIG = {
  [StandardNodeType.LLM]: {
    timeout: {
      default: 3 * 60 * 1000,
      max: 10 * 60 * 1000,
      init: 10 * 60 * 1000,
    },
    enableBackupModel: true,
  },
  [StandardNodeType.Api]: {
    timeout: {
      default: 3 * 60 * 1000,
      max: 3 * 60 * 1000,
    },
  },
};

export const ERROR_BODY_NAME = 'errorBody';
export const IS_SUCCESS_NAME = 'isSuccess';
