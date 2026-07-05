import { StandardNodeType } from '@coze-workflow/base';

import {
  BaseNodeValidator,
  type NodeValidationContext,
} from './base-validator';

export class LoopContextValidator extends BaseNodeValidator {
  protected validate(context: NodeValidationContext): boolean | null {
    const { node, parent } = context;
    const nodeType = node.type as StandardNodeType;

    if (!parent) {
      return null;
    }

    // Break/SetVariable/Continue Only allowed in Loop SubCanvas
    if (
      [
        StandardNodeType.Break,
        StandardNodeType.Continue,
        StandardNodeType.SetVariable,
      ].includes(nodeType)
    ) {
      const parentNodeMeta = parent.getNodeMeta();
      const parentSubCanvas = parentNodeMeta.subCanvas?.(parent);
      return (
        parentSubCanvas?.isCanvas &&
        parentSubCanvas.parentNode.flowNodeType === StandardNodeType.Loop
      );
    }

    return null;
  }
}
