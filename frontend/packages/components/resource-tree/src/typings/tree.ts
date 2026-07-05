import { type FlowNodeMeta } from '@flowgram-adapter/fixed-layout-editor';

export interface TreeNode {
  id: string;
  type: string;
  meta?: FlowNodeMeta;
  // Collapsed, depth in data
  data: Record<string, any>;
  parent: TreeNode[];
  children?: TreeNode[];
}
