import { getAncestorAttributeValue } from '../get-ancestor-attribute-value';

export const fixStartNode = ({
  range,
  targetAttributeName,
  targetAttributeValue,
}: {
  range: Range;
  targetAttributeName: string;
  targetAttributeValue: string;
}) => {
  let startNode: Node | null = range.startContainer;
  let { startOffset } = range;

  // Make sure the starting node meets the requirements
  while (
    startNode &&
    !(
      getAncestorAttributeValue(startNode, targetAttributeName) ===
      targetAttributeValue
    )
  ) {
    if (startNode.previousSibling) {
      startNode = startNode.previousSibling;
      startOffset = 0; // From the starting position of the previous sibling node
    } else if (startNode.parentNode && startNode.parentNode !== document) {
      startNode = startNode.parentNode;
      startOffset = 0; // Start at the beginning of the parent node
    } else {
      // No eligible starting nodes
      startNode = null;
      break;
    }
  }

  return {
    startNode,
    startOffset,
  };
};
