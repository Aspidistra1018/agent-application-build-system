/**
 * Find ancestor nodes (including itself) by TagName
 * @param node Node | null
 * @param tagName Target tagName
 * @returns Node | null
 */
export const findAncestorNodeByTagName = (
  node: Node | null,
  tagName: string,
): Element | null => {
  // Convert the tag signature to uppercase, as tag signatures in the DOM are usually uppercase
  const upperTagName = tagName.toUpperCase();

  // Traverse the node's ancestors until a matching tag is found or the root node is reached
  while (node) {
    // Make sure that the current node is an element node and that the tag signatures match
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node as Element).tagName === upperTagName
    ) {
      return node as Element;
    }
    // Move to Parent Node
    node = node.parentNode;
  }

  // If no eligible ancestor is found, return null.
  return null;
};
