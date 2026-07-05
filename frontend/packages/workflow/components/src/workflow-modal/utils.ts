import { type WorkflowModalState, WorkflowCategory } from './type';

/**
 * Workflow modal Whether the project toolflow category is currently selected
 * @param modalState
 */
export const isSelectProjectCategory = (modalState?: WorkflowModalState) =>
  modalState?.workflowCategory === WorkflowCategory.Project;
