import {
  type WorkflowNodeRegistry,
  type WorkflowNodeJSON,
  type WorkflowDocument,
} from '@flowgram-adapter/free-layout-editor';

/**
 * Is there a node with a child canvas?
 */
export const hasSubCanvasNodes = (
  workflowDocument: WorkflowDocument,
  nodes: WorkflowNodeJSON[],
) =>
  !!nodes.find(node => {
    const registry = workflowDocument.getNodeRegister(
      node.type,
    ) as WorkflowNodeRegistry;
    return !!registry?.meta?.subCanvas;
  });
