import { findPictureValidChildNode } from '../find-picture-valid-child-node';

/**
 * Processing special Node data
 * @param node Node
 * @returns node | undefined
 */
export const processSpecialNode = (node: Node) => {
  // Special optimization for picture types
  if (node.nodeName.toUpperCase() === 'PICTURE') {
    const pictureNode = findPictureValidChildNode(node.childNodes);

    if (pictureNode) {
      return pictureNode;
    }
  }

  // Special optimization for links
  if (node.nodeName.toUpperCase() === 'A') {
    return node;
  }

  // Special optimization for tables
  if (['TH', 'TD'].includes(node.nodeName.toUpperCase())) {
    return node;
  }

  return;
};
