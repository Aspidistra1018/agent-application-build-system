import { type ReactNode } from 'react';

import {
  type WorkflowMode,
  type ProductDraftStatus,
  type SchemaType,
} from '@coze-workflow/base';
import { type TableActionProps } from '@coze-arch/coze-design';
import { type ResourceInfo } from '@coze-arch/bot-api/plugin_develop';
export { type ResourceInfo };

export interface WorkflowResourceActionProps {
  /* refresh list function */
  refreshPage?: () => void;
  spaceId?: string;
  /* Current login user id */
  userId?: string;
  getCommonActions?: (
    libraryResource: ResourceInfo,
  ) => NonNullable<TableActionProps['actionList']>;
}
export interface WorkflowResourceActionReturn {
  /* Open the workflow creation pop-up window */
  openCreateModal: (flowMode?: WorkflowMode) => void;
  /* Global pop-ups for create, delete, etc. are directly mounted on the list parent container */
  workflowResourceModals: ReactNode[];
  /* Called in the render of the columns of the Table component, returning the Table. TableAction component */
  renderWorkflowResourceActions: (record: ResourceInfo) => ReactNode;
  /* Resource item click */
  handleWorkflowResourceClick: (record: ResourceInfo) => void;
}

export type UseWorkflowResourceAction = (
  props: WorkflowResourceActionProps,
) => WorkflowResourceActionReturn;

export interface WorkflowResourceBizExtend {
  product_draft_status: ProductDraftStatus;
  external_flow_info?: string;
  schema_type: SchemaType;
  plugin_id?: string;
  icon_uri: string;
  url: string;
}

export interface DeleteModalConfig {
  title: string;
  desc: string;
  okText: string;
  okHandle: () => void;
  cancelText: string;
}

export interface CommonActionProps extends WorkflowResourceActionProps {
  userId?: string;
}

export interface CommonActionReturn {
  actionHandler: (record: ResourceInfo) => void;
}
export interface DeleteActionReturn extends CommonActionReturn {
  deleteModal?: ReactNode;
}

export interface PublishActionReturn extends CommonActionReturn {
  publishModal: ReactNode;
}
