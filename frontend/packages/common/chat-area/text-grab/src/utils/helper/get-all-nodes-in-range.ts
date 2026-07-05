// Helper function to obtain all nodes in the selection
export const getAllNodesInRange = (range: Range): Node[] => {
  const nodes: Node[] = [];
  const treeWalker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ALL,
    {
      acceptNode: node =>
        range.intersectsNode(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
    },
  );

  // eslint-disable-next-line prefer-destructuring -- as expected, because the data is to be changed and allowed to be empty
  let currentNode: Node | null = treeWalker.currentNode;

  while (currentNode) {
    nodes.push(currentNode);
    currentNode = treeWalker.nextNode();
  }

  return nodes;
};
