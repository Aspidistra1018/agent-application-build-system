import { findNearestAnchor } from '../helper/find-nearest-link-node';

export const fixLink = (range: Range, startNode: Node, endNode: Node) => {
  const startAnchor = findNearestAnchor(startNode);
  const endAnchor = findNearestAnchor(endNode);

  let isFix = false;
  // If the starting node is within the link, set the starting point of the selection to the start of the link
  if (startAnchor) {
    range.setStartBefore(startAnchor);
    isFix = true;
  }

  // If the end node is within the link, set the end of the selection to the end of the link
  if (endAnchor) {
    range.setEndAfter(endAnchor);
    isFix = true;
  }

  return isFix;
};

/**
 * 1. Link [A... text... link] to B
 * 2. Link A... text [word... link] to B
 * 3.... Text [word, chain] to B
 * 4. Chain [link] B
 */
