import {
  type ValidateErrorData,
  type WorkflowMode,
} from '@coze-workflow/base/';
import { type WorkflowJSON } from '@flowgram-adapter/free-layout-editor';

export interface EncapsulateWorkflowParams {
  name: string;
  desc: string;
  json: WorkflowJSON;
  flowMode: WorkflowMode;
}

export interface EncapsulateApiService {
  /**
   * encapsulation process
   * @param name
   */
  encapsulateWorkflow: (
    params: EncapsulateWorkflowParams,
  ) => Promise<{ workflowId: string } | null>;
  /**
   * Validation Process
   * @param schema
   * @returns
   */
  validateWorkflow: (json: WorkflowJSON) => Promise<ValidateErrorData[]>;
  /**
   * Get process data
   * @param spaceId
   * @param workflowId
   * @returns
   */
  getWorkflow: (
    spaceId: string,
    workflowId: string,
    version?: string,
  ) => Promise<WorkflowJSON | null>;
}

export const EncapsulateApiService = Symbol('EncapsulateApiService');
