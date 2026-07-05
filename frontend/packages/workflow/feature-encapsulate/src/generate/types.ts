import {
  type WorkflowNodeEntity,
  type WorkflowJSON,
  type WorkflowNodeJSON,
} from '@flowgram-adapter/free-layout-editor';

import { type Rect } from '../types';

/**
 * Generate subprocess node options
 */
export interface GenerateSubWorkflowNodeOptions {
  name: string;
  workflowId: string;
  desc: string;
  spaceId: string;
}

/**
 * Encapsulation Generation Service
 */
export interface EncapsulateGenerateService {
  /**
   * generation flow
   * @param nodes
   * @returns
   */
  generateWorkflowJSON: (
    nodes: WorkflowNodeEntity[],
    options?: {
      startEndRects?: {
        start: Rect;
        end: Rect;
      };
    },
  ) => Promise<WorkflowJSON>;
  /**
   * Generate subprocess nodes
   * @param options
   * @returns
   */
  generateSubWorkflowNode: (
    options: GenerateSubWorkflowNodeOptions,
  ) => Partial<WorkflowNodeJSON>;
}

export const EncapsulateGenerateService = Symbol('EncapsulateGenerateService');
