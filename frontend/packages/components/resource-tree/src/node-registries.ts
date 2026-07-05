import {
  type FlowNodeJSON,
  FlowNodeBaseType,
  type FlowNodeEntity,
  type FlowNodeRegister,
} from '@flowgram-adapter/fixed-layout-editor';
/**
 * BlockOrderIcon-free branch nodes
 */
export const Split: FlowNodeRegister = {
  type: 'split',
  extend: 'dynamicSplit',
  onBlockChildCreate(
    originParent: FlowNodeEntity,
    blockData: FlowNodeJSON,
    addedNodes: FlowNodeEntity[] = [], // All newly created nodes must exist here
  ) {
    const { document } = originParent;
    const parent = document.getNode(`$inlineBlocks$${originParent.id}`);
    // The block node will generate an empty block node to cut the block.
    const proxyBlock = document.addNode({
      id: `$block$${blockData.id}`,
      type: FlowNodeBaseType.BLOCK,
      originParent,
      parent,
    });
    const realBlock = document.addNode(
      {
        ...blockData,
        type: blockData.type || FlowNodeBaseType.BLOCK,
        parent: proxyBlock,
      },
      addedNodes,
    );
    addedNodes.push(proxyBlock, realBlock);
    return proxyBlock;
  },
};
