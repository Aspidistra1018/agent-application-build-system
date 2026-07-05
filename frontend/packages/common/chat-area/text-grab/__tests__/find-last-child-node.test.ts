import { findLastChildNode } from '../src/utils/helper/find-last-child-node';

describe('findLastChildNode', () => {
  it('should return the last child node of a nested node structure', () => {
    // Create a nested node structure
    const parentNode = document.createElement('div');
    const childNode1 = document.createElement('span');
    const childNode2 = document.createElement('p');
    const lastChildNode = document.createElement('a');

    parentNode.appendChild(childNode1);
    childNode1.appendChild(childNode2);
    childNode2.appendChild(lastChildNode);

    // Call the findLastChildNode function
    const result = findLastChildNode(parentNode);

    // Verify that the result is the deepest sub-node
    expect(result).toBe(lastChildNode);
  });

  it('should return the node itself if it has no children', () => {
    // Create a node without a sub-node
    const singleNode = document.createElement('div');

    // Call the findLastChildNode function
    const result = findLastChildNode(singleNode);

    // Verify whether the result is the node itself
    expect(result).toBe(singleNode);
  });
});
