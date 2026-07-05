/**
 * Determine the node inclusion relationship
 * Reference document "https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition"
 * @param nodeA
 * @param nodeB
 *
 */
export const compareNodePosition = (nodeA: Node, nodeB: Node) => {
  const comparison = nodeA.compareDocumentPosition(nodeB);

  // The reason why the condition is inverse to return, please refer to the official documentation, including the relationship showing the B-A relationship
  if (comparison & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return 'contains'; // NodeA contains nodeB
  } else if (comparison & Node.DOCUMENT_POSITION_CONTAINS) {
    return 'containedBy'; // NodeA is contained by nodeB
  } else if (comparison & Node.DOCUMENT_POSITION_FOLLOWING) {
    return 'before'; // nodeA before nodeB
  } else if (comparison & Node.DOCUMENT_POSITION_PRECEDING) {
    return 'after'; // NodeA after nodeB
  }

  return 'none'; // Nodes are the same or have no comparable relationship
};
