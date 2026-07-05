import type { WorkflowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import { ValueExpressionType, type ValueExpression } from '@coze-workflow/base';

import { LoopVariablePrefix } from '../../constants';

export const formatLoopOutputName = (params: {
  name: string;
  prefix: string;
  suffix: string;
  input: ValueExpression;
  node: WorkflowNodeEntity;
}): string => {
  const { name, prefix, suffix, input, node } = params;

  // Non-reference type or non-node own variable, returning the loop body variable name
  if (
    input.type !== ValueExpressionType.REF ||
    input.content?.keyPath?.[0] !== node.id
  ) {
    return `${prefix}${name}${suffix}`;
  }

  // The node itself variable, after removing the prefix, returns
  return name.startsWith(LoopVariablePrefix)
    ? name.slice(LoopVariablePrefix.length)
    : name;
};
