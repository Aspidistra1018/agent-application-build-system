import { OrderBy, WorkFlowListStatus } from '@coze-workflow/base/api';
import { I18n } from '@coze-arch/i18n';

import { WORKFLOW_LIST_STATUS_ALL } from '@/workflow-modal/type';

/** Process Owner Options, All/Mine */
export const scopeOptions = [
  {
    label: I18n.t('workflow_list_scope_all'),
    value: 'all',
  },
  {
    label: I18n.t('workflow_list_scope_mine'),
    value: 'me',
  },
];

/** Process Status Options, All/Published/Unpublished */
export const statusOptions = [
  {
    label: I18n.t('workflow_list_status_all'),
    value: WORKFLOW_LIST_STATUS_ALL,
  },
  {
    label: I18n.t('workflow_list_status_published'),
    value: WorkFlowListStatus.HadPublished,
  },
  {
    label: I18n.t('workflow_list_status_unpublished'),
    value: WorkFlowListStatus.UnPublished,
  },
];

/** Process sorting options, creation time/update time */
export const sortOptions = [
  {
    label: I18n.t('workflow_list_sort_create_time'),
    value: OrderBy.CreateTime,
  },
  {
    label: I18n.t('workflow_list_sort_edit_time'),
    value: OrderBy.UpdateTime,
  },
];
