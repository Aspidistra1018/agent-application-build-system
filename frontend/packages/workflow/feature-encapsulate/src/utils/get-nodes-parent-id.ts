import { type FlowNodeEntity } from '@flowgram-adapter/free-layout-editor';

/**
 * Get the parent ID of the node
 */
export const getNodesParentId = (nodes: FlowNodeEntity[]): string =>
  nodes[0]?.parent?.id || 'root';
