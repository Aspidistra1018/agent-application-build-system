/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import * as resource_common from './resource_common';

export type Int64 = string | number;

export interface AuthData {
  /** 资源类型 */
  res_type?: resource_common.ResType;
  /** 节点鉴权信息 */
  auth_data?: string;
  /** 资源ID */
  res_id?: Int64;
}
/* eslint-enable */
