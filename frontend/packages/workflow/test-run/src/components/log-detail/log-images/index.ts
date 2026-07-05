import { type NodeResult } from '@coze-workflow/base';

/**
 * Log images business logic is too heavy, this period will not draw
 */
export type LogImages = React.FC<{
  testRunResult: NodeResult;
  nodeId?: string;
}>;
