import {
  FlowNodeBaseType,
  type FlowNodeEntity,
} from '@flowgram-adapter/free-layout-editor';
import { type WorkflowSubCanvas } from '@flowgram-adapter/free-layout-editor';

/**
 * Is the multi-node in the subcanvas?
 * @param nodes
 * @returns
 */
export const isNodesInSubCanvas = (nodes?: FlowNodeEntity[]) =>
  isNodeInSubCanvas(nodes?.[0]);

/**
 * Is the single node in the subcanvas?
 * @param nodes
 * @returns
 */
export const isNodeInSubCanvas = (node?: FlowNodeEntity) =>
  node?.parent?.id !== 'root';

/**
 * Is it a child canvas node?
 * @param node
 * @returns
 */
export const isSubCanvasNode = (node?: FlowNodeEntity) =>
  node?.flowNodeType === FlowNodeBaseType.SUB_CANVAS;

/**
 * Get the parent node of the child canvas
 * @param node
 * @returns
 */
export const getSubCanvasParent = (node?: FlowNodeEntity) => {
  const nodeMeta = node?.getNodeMeta();
  const subCanvas: WorkflowSubCanvas = nodeMeta?.subCanvas(node);
  return subCanvas?.parentNode;
};
