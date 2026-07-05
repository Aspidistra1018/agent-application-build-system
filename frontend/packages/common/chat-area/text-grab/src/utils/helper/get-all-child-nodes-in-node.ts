// Helper function to obtain all nodes in the selection
export const getAllChildNodesInNode = (node: Node): Node[] => {
  const nodes: Node[] = [];
  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ALL, {
    acceptNode: _node =>
      node.contains(_node)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  });

  // eslint-disable-next-line prefer-destructuring -- as expected, because the data is to be changed and allowed to be empty
  let currentNode: Node | null = treeWalker.currentNode;

  while (currentNode) {
    nodes.push(currentNode);
    currentNode = treeWalker.nextNode();
  }

  return nodes;
};
