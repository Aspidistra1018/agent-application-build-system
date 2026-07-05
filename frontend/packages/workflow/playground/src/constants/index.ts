export const WORKFLOW_INNER_SIDE_SHEET_HOLDER =
  'workflow-inner-side-sheet-holder';

export const WORKFLOW_OUTER_SIDE_SHEET_HOLDER =
  'workflow-outer-side-sheet-holder';

export const DND_ACCEPT_KEY = 'flow-workflow-canvas-dnd';

export const WORKFLOW_PLAYGROUND_CONTENT_ID = 'workflow-playground-content';

export const WORKFLOW_CONTENT_ID = 'workflow-content';

export const SYSTEM_PROMPT_PANEL = 'system-prompt-panel';

export enum LayoutPanelKey {
  /** Node Form */
  NodeForm = 'node-form',
  /** Practice running process forms */
  TestFlowForm = 'test-flow-form',
  /** Practice running chatflow */
  TestChatFlowForm = 'test-chat-flow-form',
  /** log list */
  TraceList = 'trace-list',
  /** log details */
  TraceDetail = 'trace-detail',
  /** role configuration */
  RoleConfig = 'role-config',
}

/**
 * dependent source type
 */
export enum DependencySourceType {
  /** database */
  DataBase = 'database',
  /** Knowledge Base */
  DataSet = 'dataset',
  /** Large model */
  LLM = 'llm',
  /** plugin */
  Plugin = 'plugin',
  /** Workflow */
  Workflow = 'workflow',
}
