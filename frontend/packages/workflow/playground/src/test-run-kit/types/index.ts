import { type WorkflowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import { type IFormSchema } from '@coze-workflow/test-run-next';
/**
 * At present, the type location imported from flow-sdk in the project is rather confusing
 * Test run all closed to kit
 */
export { type WorkflowNodeEntity } from '@flowgram-adapter/free-layout-editor';

interface Context {
  isChatflow: boolean;
  isInProject: boolean;
  workflowId: string;
  spaceId: string;
}
/**
 * Node Registry Test Meta
 */
export type NodeTestMeta =
  | {
      /**
       * Whether to support test sets
       */
      testset?: boolean;
      /**
       * The association context required for TestRun to run
       */
      generateRelatedContext?: (
        node: WorkflowNodeEntity,
        context: Context,
      ) => IFormSchema | null | Promise<IFormSchema | null>;
      generateFormInputProperties?: (
        node: WorkflowNodeEntity,
      ) => IFormSchema['properties'] | Promise<IFormSchema['properties']>;
      generateFormBatchProperties?: (
        node: WorkflowNodeEntity,
      ) => IFormSchema['properties'] | Promise<IFormSchema['properties']>;
      generateFormSettingProperties?: (
        node: WorkflowNodeEntity,
      ) => IFormSchema['properties'] | Promise<IFormSchema['properties']>;
    }
  | boolean;
