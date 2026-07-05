import {
  type WorkflowJSON,
  type WorkflowDocument,
  type WorkflowNodeJSON,
  type WorkflowNodeEntity,
} from '@flowgram.ai/free-layout-core';

/**
 * Global data transformation
 */
export interface WorkflowJSONFormatContribution {
  /**
   * Called during data initialization
   */
  formatOnInit?: (json: WorkflowJSON, doc: WorkflowDocument) => WorkflowJSON;
  /**
   * Called when data is submitted
   */
  formatOnSubmit?: (json: WorkflowJSON, doc: WorkflowDocument) => WorkflowJSON;
  /**
   * Transform node initialization data
   * @param data
   * Parameters initialized by @param
   */
  formatNodeOnInit?: (
    data: WorkflowNodeJSON,
    doc: WorkflowDocument,
    isClone?: boolean,
  ) => WorkflowNodeJSON;
  /**
   * Unified conversion form submission data
   * @param data
   */
  formatNodeOnSubmit?: (
    data: WorkflowNodeJSON,
    doc: WorkflowDocument,
    node: WorkflowNodeEntity,
  ) => WorkflowNodeJSON;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WorkflowJSONFormatContribution = Symbol(
  'WorkflowJSONFormatContribution',
);
