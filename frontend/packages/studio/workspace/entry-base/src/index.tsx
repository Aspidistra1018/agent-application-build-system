export { default as Plugin } from './pages/plugin';
export { default as Tool } from './pages/tool';
export { default as MocksetDetail } from './pages/mockset';
export { default as MocksetList } from './pages/mockset-list';

// ! Notice prohibits the direct export of knowledge-related codes to avoid first-screen loading
// export { default as KnowledgePreviewPage } from './pages/knowledge-preview';
// export { default as KnowledgeUploadPage } from './pages/knowledge-upload';
export { default as DatabaseDetailPage } from './pages/database';

export {
  resourceNavigate as pluginResourceNavigate,
  compareObjects,
} from './utils';

// common component
export { Creator } from './components/creator';
export {
  Content,
  Header,
  HeaderActions,
  HeaderTitle,
  Layout,
  SubHeader,
  SubHeaderFilters,
} from './components/layout/list';
export { WorkspaceEmpty } from './components/workspace-empty';

// constants
export { highlightFilterStyle } from './constants/filter-style';
