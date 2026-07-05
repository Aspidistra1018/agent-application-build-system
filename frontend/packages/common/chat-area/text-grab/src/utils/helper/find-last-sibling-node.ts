import { getAncestorAttributeValue } from '../get-ancestor-attribute-value';

/**
 * Find the last sibling of a node
 * @param node find node
 * @returns
 */
export const findLastSiblingNode = ({
  node,
  scopeAncestorAttributeName,
  targetAttributeValue,
}: {
  node: Node | null;
  scopeAncestorAttributeName?: string;
  targetAttributeValue?: string | null;
}): Node | null => {
  let lastValidSibling: Node | null = null;
  while (node) {
    if (
      scopeAncestorAttributeName &&
      getAncestorAttributeValue(node, scopeAncestorAttributeName) ===
        targetAttributeValue
    ) {
      lastValidSibling = node;
    }
    node = node.nextSibling;
  }
  return lastValidSibling;
};
