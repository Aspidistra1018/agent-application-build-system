import type { WorkflowNodeEntity } from '@flowgram-adapter/free-layout-editor';

import type { WorkflowCustomDragService } from '@/services';
import type { WorkflowGlobalStateEntity } from '@/typing';

import type {
  WorkflowClipboardNodeJSON,
  WorkflowClipboardSource,
} from '../../type';
import {
  ApiNodeValidator,
  CrossSpaceNodeValidator,
  DropValidator,
  LoopContextValidator,
  NestedLoopBatchValidator,
  SameSpaceValidator,
  SameWorkflowValidator,
  SceneNodeValidator,
  SubWorkflowSelfRefValidator,
} from './validators';
import { ValidationChain } from './validators/validation-chain';

/** Is it a legal node? */
export const isValidNode = (params: {
  node: WorkflowClipboardNodeJSON;
  parent?: WorkflowNodeEntity;
  source: WorkflowClipboardSource;
  globalState: WorkflowGlobalStateEntity;
  dragService: WorkflowCustomDragService;
}): boolean => {
  const validationChain = new ValidationChain();
  validationChain
    // 1. Same space, same workflow
    .setNext(new DropValidator())
    .setNext(new LoopContextValidator())
    .setNext(new NestedLoopBatchValidator())
    .setNext(new SubWorkflowSelfRefValidator())
    // 2. Same space, different workflows
    .setNext(new SameWorkflowValidator())
    .setNext(new SceneNodeValidator())
    // 3. Cross-spatial space
    .setNext(new SameSpaceValidator())
    .setNext(new ApiNodeValidator())
    .setNext(new CrossSpaceNodeValidator());

  return validationChain.run(params);
};
