export const hasVisibleSelection = (range: Range): boolean => {
  // Clone all nodes within the Range
  const documentFragment = range.cloneContents();
  const textNodes: Text[] = [];

  // Recursive function to collect all text nodes
  function collectTextNodes(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node as Text);
    } else {
      node.childNodes.forEach(collectTextNodes);
    }
  }

  // Collect text nodes from the root node of the document fragment
  collectTextNodes(documentFragment);

  // Check for non-blank text in the collected text nodes
  return textNodes.some(textNode => /\S/.test(textNode.textContent || ''));
};
