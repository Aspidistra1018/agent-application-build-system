/**
 * Get formatted SelectionNodeList data
 * Get the text content fed to the large model
 */
import { type GrabNode } from '../../types/node';
import { isGrabTextNode } from './is-grab-text-node';
import { isGrabLink } from './is-grab-link';
import { isGrabImage } from './is-grab-image';

export const getOriginContentText = (normalizeNodeList: GrabNode[]) => {
  let content = '';

  for (const node of normalizeNodeList) {
    if (isGrabTextNode(node)) {
      content += node.text;
    } else if (isGrabLink(node)) {
      content += `[${getOriginContentText(node.children)}](${node.url})`;
    } else if (isGrabImage(node)) {
      content += `![${getOriginContentText(node.children)}](${node.src})`;
    } else {
      content += getOriginContentText(node.children);
    }
  }

  return content;
};
