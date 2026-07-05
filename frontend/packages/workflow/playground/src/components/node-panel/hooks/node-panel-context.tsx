import { useContext, createContext, type MouseEvent } from 'react';

import { type NodePanelSearchType } from '@coze-arch/bot-api/workflow_api';

import { type UnionNodeTemplate } from '@/typing';
interface NodePanelContextType {
  onSelect?: (props: {
    event: MouseEvent<HTMLElement>;
    nodeTemplate: UnionNodeTemplate;
  }) => void;
  enableDrag?: boolean;
  keyword?: string;
  getScrollContainer?: () => HTMLDivElement | undefined;
  onLoadMore?: (id?: NodePanelSearchType, cursor?: string) => Promise<void>;
  /**
   * Update the status of the node being added, clickOutside will not close the node panel at this time
   * @param isAdding
   * @returns
   */
  onAddingNode?: (isAdding: boolean) => void;
}

const NodePanelContext = createContext<NodePanelContextType>({});

export const NodePanelContextProvider = NodePanelContext.Provider;

export const useNodePanelContext = () => useContext(NodePanelContext);
