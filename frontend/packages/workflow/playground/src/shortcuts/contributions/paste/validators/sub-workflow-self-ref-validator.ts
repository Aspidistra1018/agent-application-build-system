import { StandardNodeType } from '@coze-workflow/base';

import {
  BaseNodeValidator,
  type NodeValidationContext,
} from './base-validator';

export class SubWorkflowSelfRefValidator extends BaseNodeValidator {
  protected validate(context: NodeValidationContext): boolean | null {
    const { node, globalState } = context;

    // Do not allow a workflow to reference itself as a child workflow
    if (
      node.type === StandardNodeType.SubWorkflow &&
      node.data?.inputs?.workflowId === globalState.workflowId
    ) {
      return false;
    }

    return null;
  }
}
