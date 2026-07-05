/**
 * Find the last sub-node of a node
 * @param node Node
 * @returns Node
 */
export const findLastChildNode = (node: Node): Node => {
  while (node.lastChild) {
    node = node.lastChild;
  }
  return node;
};
