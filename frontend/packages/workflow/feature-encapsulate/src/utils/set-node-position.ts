import { type WorkflowNodeJSON } from '@flowgram-adapter/free-layout-editor';
import { type IPoint } from '@flowgram-adapter/common';

import { type Rect } from '../types';

/**
 * Set node coordinates
 * @param node
 * @returns
 */
export function setNodePosition(
  node: WorkflowNodeJSON,
  position: IPoint,
): void {
  if (!node.meta) {
    node.meta = {};
  }

  node.meta.position = position;
}

/**
 * Set node coordinates according to the rectangle
 * @param node
 * @param rect
 */
export function setNodePositionByRect(node: WorkflowNodeJSON, rect: Rect) {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  setNodePosition(node, { x: rect.x + rect.width / 2, y: rect.y });
}
