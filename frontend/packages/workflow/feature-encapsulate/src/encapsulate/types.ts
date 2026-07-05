import {
  type WorkflowPortEntity,
  type WorkflowNodeEntity,
  type WorkflowLineEntity,
  type WorkflowNodeJSON,
} from '@flowgram-adapter/free-layout-editor';
import { type Event } from '@flowgram-adapter/common';
import { type WorkflowVariable } from '@coze-workflow/variable';

import { type EncapsulateValidateResult } from '../validate';

/**
 * Encapsulation result
 */
export type EncapsulateResult =
  | EncapsulateErrorResult
  | EncapsulateSuccessResult;

/**
 * Wrong result
 */
export interface EncapsulateErrorResult {
  /**
   * state
   */
  success: false;
  /**
   * message prompt
   */
  message: string;
}

/**
 * successful outcome
 */
export interface EncapsulateSuccessResult {
  /**
   * state
   */
  success: true;
  /**
   * generated node
   */
  subFlowNode: WorkflowNodeEntity;
  /**
   * Generated input line
   */
  inputLines: WorkflowLineEntity[];
  /**
   * Generated output line
   */
  outputLines: WorkflowLineEntity[];
  /**
   * Generated workflow id
   */
  workflowId: string;
  /**
   * projectId
   */
  projectId?: string;
}

/**
 * Encapsulation/unsealing service
 */
export interface EncapsulateService {
  /**
   * Can it be encapsulated?
   */
  canEncapsulate: () => boolean;
  /**
   * package
   */
  encapsulate: () => Promise<EncapsulateResult>;
  /**
   * Whether to support unblocking
   */
  canDecapsulate: (node: WorkflowNodeEntity) => boolean;
  /**
   * unblock
   */
  decapsulate: (node: WorkflowNodeEntity) => Promise<void>;
  /**
   * validation
   */
  validate: () => Promise<EncapsulateValidateResult>;
  /**
   * Package successful callback
   */
  onEncapsulate: Event<EncapsulateResult>;
  /**
   * destroy
   */
  dispose: () => void;
}

export const EncapsulateService = Symbol('EncapsulateService');

/**
 * Encapsulation/unsealing management
 */
export interface EncapsulateManager {
  /**
   * initialization
   */
  init: () => void;
  /**
   * destroy
   * @returns
   */
  dispose: () => void;
}

export const EncapsulateManager = Symbol('EncapsulateManager');

/**
 * connection port
 */
export interface ConnectPortsInfo {
  inputLines: WorkflowLineEntity[];
  outputLines: WorkflowLineEntity[];
  fromPorts: WorkflowPortEntity[];
  toPorts: WorkflowPortEntity[];
}

export interface DecapsulateContext {
  idsMap: Map<string, string>;
  startNode?: WorkflowNodeJSON;
  endNode?: WorkflowNodeJSON;
  middleNodes: WorkflowNodeJSON[];
}

export type VariableMap = Record<string, WorkflowVariable>;

export interface EncapsulateVars {
  startVars: VariableMap;
  endVars: VariableMap;
}
