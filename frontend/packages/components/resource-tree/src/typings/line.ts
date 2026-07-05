import {
  type FlowNodeEntity,
  type IPoint,
} from '@flowgram-adapter/fixed-layout-editor';

export interface CustomLine {
  from: FlowNodeEntity;
  to: FlowNodeEntity;
  fromPoint: IPoint;
  toPoint: IPoint;
  activated?: boolean;
}

/**
 * Resource icon type
 */
export enum NodeType {
  WORKFLOW, // Workflow
  CHAT_FLOW, // conversation flow
  KNOWLEDGE, // Knowledge Base
  PLUGIN, // plugin
  DATABASE, // database
}

/**
 * source of resources
 */
export enum DependencyOrigin {
  LIBRARY, // resource library
  APP, // App / Project
  SHOP, // store
}

export interface EdgeItem {
  from: string;
  to: string;
  collapsed?: boolean;
}
