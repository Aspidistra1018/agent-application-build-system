import { type StandardNodeType } from '@coze-workflow/base';

import {
  SETTING_ON_ERROR_DYNAMIC_PORT_NODES,
  SETTING_ON_ERROR_NODES,
  SETTING_ON_ERROR_V2_NODES,
} from './constants';

/**
 * Is it a node of the v2 version?
 * @param type
 * @returns
 */
export const isSettingOnErrorV2 = (type?: StandardNodeType) =>
  type && SETTING_ON_ERROR_V2_NODES.includes(type);

/**
 * Is it the node with the abnormal setting turned on?
 * @param type
 * @returns
 */
export const isSettingOnError = (type?: StandardNodeType) =>
  type && SETTING_ON_ERROR_NODES.includes(type);

/**
 * Is it a node of the dynamic channel?
 * @param type
 * @returns
 */
export const isSettingOnErrorDynamicPort = (type?: StandardNodeType) =>
  type && SETTING_ON_ERROR_DYNAMIC_PORT_NODES.includes(type);
