import { type ReactNode } from 'react';

import { type Dataset, type DocumentInfo } from '@coze-arch/bot-api/knowledge';

import { type ProgressMap } from '@/types';

export interface KnowledgeIDEBaseLayoutProps {
  keepDocTitle?: boolean;
  className?: string;
  renderNavBar?: (context: KnowledgeRenderContext) => ReactNode;
  renderContent?: (context: KnowledgeRenderContext) => ReactNode;
}

/**
 * Knowledge base query related operations
 */
export interface KnowledgeDataActions {
  /** Reload the knowledge base data and document list */
  refreshData: () => void;
  /** Update Knowledge Base Dataset Details */
  updateDataSetDetail: (data: Dataset) => void;
  /** Update document list data */
  updateDocumentList: (data: DocumentInfo[]) => void;
}

/**
 * Knowledge Base Status Information
 */
export interface KnowledgeStatusInfo {
  /** Is the knowledge base loading? */
  isReloading: boolean;
  /** File processing progress information */
  progressMap: ProgressMap;
}

/**
 * Knowledge base data information
 */
export interface KnowledgeDataInfo {
  /** Knowledge Base Dataset Details */
  dataSetDetail: Dataset;
  /** document list */
  documentList: DocumentInfo[];
}

/**
 * knowledge base rendering context
 */
export interface KnowledgeRenderContext {
  /** Component property configuration */
  layoutProps: KnowledgeIDEBaseLayoutProps;
  /** Knowledge base data information */
  dataInfo: KnowledgeDataInfo;
  /** Knowledge Base Status Information */
  statusInfo: KnowledgeStatusInfo;
  /** Knowledge base data manipulation */
  dataActions: KnowledgeDataActions;
}
