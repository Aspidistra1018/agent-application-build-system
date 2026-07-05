import { getPictureNodeUrl } from './get-picture-node-url';

/**
 * Get a valid node for the node whose TagName is Picture
 * @param childNodes NodeListOf < Node > sub-node list
 * @returns Node | null
 */
export const findPictureValidChildNode = (childNodes: NodeListOf<Node>) =>
  Array.from(childNodes)
    .filter(node => getPictureNodeUrl(node))
    .at(0);
