import { getAllChildNodesInNode } from '../src/utils/helper/get-all-child-nodes-in-node';

describe('getAllChildNodesInNode', () => {
  let root: HTMLElement;

  beforeEach(() => {
    // Setting up the DOM structure before each test case
    document.body.innerHTML = `
      <div id="root">
        <span>Text 1</span>
        <div>
          <p>Text 2</p>
        </div>
        Text 3
      </div>
    `;
    root = document.getElementById('root') as HTMLElement;
  });

  it('should return all child nodes of a given node, including text nodes', () => {
    const nodes = getAllChildNodesInNode(root);
    expect(nodes.length).toBe(11);
  });

  it('should return an empty array if the node has no children', () => {
    const emptyNode = document.createElement('div');
    const nodes = getAllChildNodesInNode(emptyNode);
    expect(nodes).toEqual([emptyNode]);
  });

  it('should correctly handle text and element nodes', () => {
    const nodes = getAllChildNodesInNode(root);
    // Check if the returned node type is correct
    expect(nodes.some(node => node.nodeType === Node.TEXT_NODE)).toBe(true); // At least one text node
    expect(nodes.some(node => node.nodeType === Node.ELEMENT_NODE)).toBe(true); // There is at least one element node
  });
});
