import { type TreeProps } from '../tree';
import { type DataSource } from '../../typings/graph';
import { type SpanTypeConfigMap } from '../../typings/config';

export type TraceTreeProps = {
  dataSource: DataSource;
  spaceId?: string;
  selectedSpanId?: string;
  spanTypeConfigMap?: SpanTypeConfigMap;
} & Pick<
  TreeProps,
  | 'indentDisabled'
  | 'lineStyle'
  | 'globalStyle'
  | 'onSelect'
  | 'onClick'
  | 'onMouseMove'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'className'
>;

export interface SpanDetail {
  isCozeWorkflowNode: boolean;
  workflowLevel: number; // Workflow Hierarchy
  workflowVersion?: string; // Parent node passes through to sub-node
}

export interface WorkflowJumpParams {
  workflowID: string;
  executeID?: string;
  workflowNodeID?: string;
  workflowVersion?: string;
  subExecuteID?: string;
}
