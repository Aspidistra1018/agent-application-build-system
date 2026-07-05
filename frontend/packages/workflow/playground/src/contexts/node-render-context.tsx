import { createContext } from 'react';

export type NodeRenderScene =
  | 'new-node-render'
  | 'node-side-sheet'
  | 'old-node-render'
  | 'side-expand-modal'
  | undefined;

/** Used to determine under what scenarios the node-render front end is used */
export const NodeRenderSceneContext = createContext<NodeRenderScene>(undefined);
