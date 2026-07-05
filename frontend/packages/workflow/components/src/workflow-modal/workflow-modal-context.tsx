import React from 'react';

import {
  type BindBizType,
  type OrderBy,
  type WorkflowMode,
} from '@coze-workflow/base/api';
import { type SpaceType } from '@coze-arch/bot-api/playground_api';

import { type WorkflowModalState } from './type';
import { type I18nKey, type ModalI18nKey } from './hooks/use-i18n-text';

export interface WorkflowModalContextValue {
  spaceId: string;
  spaceType: SpaceType;
  bindBizId?: string;
  bindBizType?: BindBizType;
  /** The current project id, only the workflow within the project has this field */
  projectId?: string;
  /** Workflow type, this parameter is passed in by props when created by WorkflowModal pop-up window, possible values are Workflow, Imageflow. Used to distinguish which workflow to add */
  flowMode: WorkflowMode;
  modalState: WorkflowModalState;
  /** Update popup status, merge mode */
  updateModalState: (newState: Partial<WorkflowModalState>) => void;
  orderBy: OrderBy;
  setOrderBy: React.Dispatch<React.SetStateAction<OrderBy>>;
  createModalVisible: boolean;
  setCreateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  /** Get the current pop-up state, which can be used to restore the pop-up state */
  getModalState: (ctx: WorkflowModalContextValue) => WorkflowModalState;

  /** Custom i18n copy */
  i18nMap?: Partial<Record<ModalI18nKey, I18nKey>>;
}

const WorkflowModalContext =
  React.createContext<WorkflowModalContextValue | null>(null);

export default WorkflowModalContext;
