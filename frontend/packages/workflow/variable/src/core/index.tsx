export { extendASTNodes } from './extend-ast';
export {
  parseNodeOutputByViewVariableMeta,
  parseNodeBatchByInputList,
} from './utils/create-ast';
export { WorkflowVariableFacadeService } from './workflow-variable-facade-service';

// Rename to WorkflowVariable for easier business understanding
export { WorkflowVariableFacade as WorkflowVariable } from './workflow-variable-facade';
