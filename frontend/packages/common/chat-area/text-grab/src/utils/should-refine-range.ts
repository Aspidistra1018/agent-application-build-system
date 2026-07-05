import { CONTENT_ATTRIBUTE_NAME } from '../constants/range';
import { getAllNodesInRange } from './helper/get-all-nodes-in-range';
import { findAncestorNodeByTagName } from './helper/find-ancestor-node-by-tag-name';
import { getAncestorAttributeValue } from './get-ancestor-attribute-value';

export const shouldRefineRange = (range: Range): boolean => {
  // Get all nodes of the selection
  const nodes = getAllNodesInRange(range);

  let validNodeLength = 0;

  let hasNodeInLink = false;

  // Traverse all nodes to check if their ancestors have a specific class name attribute
  for (const node of nodes) {
    const attributeValue = getAncestorAttributeValue(
      node,
      CONTENT_ATTRIBUTE_NAME,
    );

    // If it doesn't exist, you need to overwrite hasNodeInLink and make sure to find a node in the link.
    if (!hasNodeInLink) {
      hasNodeInLink = Boolean(findAncestorNodeByTagName(node, 'A'));
    }

    if (attributeValue) {
      validNodeLength++;
    }
  }

  const { endOffset } = range;

  return validNodeLength !== nodes.length || hasNodeInLink || endOffset === 0;
};
