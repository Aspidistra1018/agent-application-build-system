import { compareNodePosition } from './compare-node-position';

export const findNotContainsPreviousSibling = (
  node: Node | null,
): Node | null => {
  if (!node || node === document) {
    return null;
  }

  let sibling: Node | null = node.previousSibling ?? node.parentNode;

  while (sibling) {
    if (sibling === document) {
      return null;
    }

    // Get the relationship between two nodes
    const relationship = compareNodePosition(sibling, node);

    // If there is no containing relationship between the two nodes, the current sibling is returned
    if (!['containedBy', 'contains'].includes(relationship)) {
      return sibling;
    }

    if (!sibling.previousSibling) {
      sibling = sibling.parentNode;
    } else {
      sibling = sibling.previousSibling;
    }
  }

  return null;
};
