export const findNearestAnchor = (
  node: Node | null,
): HTMLAnchorElement | null => {
  // Traverse up from the current node
  while (node) {
    // If the current node is an element node and is a < a > tag
    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'A') {
      // Return this < a > tag
      return node as HTMLAnchorElement;
    }
    // Move up to the parent node
    node = node.parentNode;
  }
  // If the < a > tag is not found at the root node, return null.
  return null;
};
