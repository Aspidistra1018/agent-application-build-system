import { StandardNodeType } from '@coze-workflow/base';

import {
  BaseNodeValidator,
  type NodeValidationContext,
} from './base-validator';

export class SceneNodeValidator extends BaseNodeValidator {
  protected validate(context: NodeValidationContext): boolean | null {
    const { node } = context;

    // Replication of scene workflow-specific nodes across workflows is not allowed
    if (
      node.type === StandardNodeType.SceneChat ||
      node.type === StandardNodeType.SceneVariable
    ) {
      return false;
    }

    return null;
  }
}
