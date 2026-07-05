import { type FeedbackStatus } from '@flowgram-adapter/free-layout-editor';
import { type WorkflowValidateError } from '@coze-workflow/base/services';
export type WorkflowProblem = WorkflowValidateError & {
  problems: {
    node: ProblemItem[];
    line: ProblemItem[];
  };
};

export interface ProblemItem {
  // error description
  errorInfo: string;
  // error level
  errorLevel: FeedbackStatus;
  // Error Type: Node/Connection
  errorType: 'node' | 'line';
  // Node ID
  nodeId: string;
  // In the case of a connection error, the target node is also required to confirm the connection
  targetNodeId?: string;
}
