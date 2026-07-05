import { compareNodePosition } from '../src/utils/helper/compare-node-position';

describe('compareNodePosition', () => {
  let parentNode: HTMLElement;
  let childNode: HTMLElement;
  let siblingNode: HTMLElement;

  beforeEach(() => {
    // Create a new DOM structure before each test
    parentNode = document.createElement('div');
    childNode = document.createElement('span');
    siblingNode = document.createElement('p');
    parentNode.appendChild(childNode); // childNode is a sub-node of parentNode
    parentNode.appendChild(siblingNode); // siblingNode is a sibling of childNode
  });

  it('should return "before" if nodeA is before nodeB', () => {
    expect(compareNodePosition(childNode, siblingNode)).toBe('before');
  });

  it('should return "after" if nodeA is after nodeB', () => {
    expect(compareNodePosition(siblingNode, childNode)).toBe('after');
  });

  it('should return "contains" if nodeA contains nodeB', () => {
    expect(compareNodePosition(parentNode, childNode)).toBe('contains');
  });

  it('should return "containedBy" if nodeA is contained by nodeB', () => {
    expect(compareNodePosition(childNode, parentNode)).toBe('containedBy');
  });

  it('should return "none" for the same node', () => {
    expect(compareNodePosition(parentNode, parentNode)).toBe('none');
  });
});
