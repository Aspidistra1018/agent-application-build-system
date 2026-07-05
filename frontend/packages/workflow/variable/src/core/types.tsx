import { type BaseVariableField } from '@flowgram-adapter/free-layout-editor';
import { type FlowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import { type ViewVariableMeta } from '@coze-workflow/base/types';

export enum ExtendASTKind {
  Image = 'Image',
  File = 'File',
  ExtendBaseType = 'ExtendBaseType',
  MergeGroupExpression = 'MergeGroupExpression',
  SyncBackOutputs = 'SyncBackOutputs',
}

export type WorkflowVariableField = BaseVariableField<
  Partial<ViewVariableMeta>
>;

export interface RenameInfo {
  prevKeyPath: string[];
  nextKeyPath: string[];

  // The location of the rename, and the corresponding key value
  modifyIndex: number;
  modifyKey: string;
}

export interface GetKeyPathCtx {
  // The current node
  node?: FlowNodeEntity;
  // Verify that the variable is in scope
  checkScope?: boolean;
}
