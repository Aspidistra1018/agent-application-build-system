// Workflow store, currently holds the nodes and edges data of the flow

import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import {
  type WorkflowEdgeJSON,
  type WorkflowNodeJSON,
} from '@flowgram-adapter/free-layout-editor';

interface WorkflowStoreState {
  /** node data */
  nodes: WorkflowNodeJSON[];

  /** edge data */
  edges: WorkflowEdgeJSON[];

  /** Are you creating a workflow? */
  isCreatingWorkflow: boolean;
}

interface WorkflowStoreAction {
  setNodes: (value: WorkflowNodeJSON[]) => void;
  setEdges: (value: WorkflowEdgeJSON[]) => void;
  setIsCreatingWorkflow: (value: boolean) => void;
}

const initialStore: WorkflowStoreState = {
  nodes: [],
  edges: [],
  isCreatingWorkflow: false,
};

export const useWorkflowStore = create<
  WorkflowStoreState & WorkflowStoreAction
>()(
  devtools(set => ({
    ...initialStore,
    setNodes: nodes => set({ nodes: nodes ?? [] }),
    setEdges: edges => set({ edges: edges ?? [] }),
    setIsCreatingWorkflow: value => set({ isCreatingWorkflow: value }),
  })),
);
