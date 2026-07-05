/**
 * Get URLs in image Node
 * @param node Node
 * @returns string
 */
export const getPictureNodeUrl = (node: Node) => {
  if (!('src' in node) || !(typeof node.src === 'string')) {
    return;
  }

  return node.src;
};
