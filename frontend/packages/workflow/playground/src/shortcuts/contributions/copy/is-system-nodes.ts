import type { WorkflowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import { StandardNodeType } from '@coze-workflow/base';

/** Is there a system node? */
export const hasSystemNodes = (nodes: WorkflowNodeEntity[]): boolean =>
  nodes.some(n =>
    [StandardNodeType.Start, StandardNodeType.End].includes(
      n.flowNodeType as StandardNodeType,
    ),
  );

export const isAllSystemNodes = (nodes: WorkflowNodeEntity[]): boolean =>
  nodes.every(n =>
    [StandardNodeType.Start, StandardNodeType.End].includes(
      n.flowNodeType as StandardNodeType,
    ),
  );
