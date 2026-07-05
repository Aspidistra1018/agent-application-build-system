import { findLastChildNode } from '../helper/find-last-child-node';
import { getAncestorAttributeValue } from '../get-ancestor-attribute-value';

export const fixEndNode = ({
  range,
  targetAttributeName,
  targetAttributeValue,
}: {
  range: Range;
  targetAttributeName: string;
  targetAttributeValue: string;
}) => {
  let endNode: Node | null = range.endContainer;
  let { endOffset } = range;

  // Make sure the end node meets the conditions
  while (
    endNode &&
    !(
      getAncestorAttributeValue(endNode, targetAttributeName) ===
      targetAttributeValue
    )
  ) {
    if (endNode.nextSibling) {
      endNode = endNode.nextSibling;
      endOffset = 0; // Start from the starting position of the next sibling node
    } else if (endNode.parentNode && endNode.parentNode !== document) {
      endNode = endNode.parentNode;
      endOffset = endNode
        ? findLastChildNode(endNode).textContent?.length ?? 0
        : 0; // Start from the last position of the parent node
    } else {
      // No eligible end nodes
      endNode = null;
      break;
    }
  }

  return {
    endNode,
    endOffset,
  };
};
