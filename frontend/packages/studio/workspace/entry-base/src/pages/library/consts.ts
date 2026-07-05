import { I18n } from '@coze-arch/i18n';
import {
  PublishStatus,
  ResType,
  type LibraryResourceListRequest,
} from '@coze-arch/bot-api/plugin_develop';

export const LIBRARY_PAGE_SIZE = 15;

export type QueryParams = Omit<LibraryResourceListRequest, 'space_id' | 'size'>;

export const initialParam: QueryParams = {
  cursor: '',
  user_filter: 0,
  publish_status_filter: 0,
  res_type_filter: [-1],
  name: '',
};

/** Is it created by the current user?
 * 0 - Do not filter
 * 1 - Current user */
export const getScopeOptions = () => [
  {
    label: I18n.t('library_filter_tags_all_creators'),
    value: 0,
  },
  {
    label: I18n.t('library_filter_tags_created_by_me'),
    value: 1,
  },
];

/** Release status:
 * 0 - Do not filter
 * 1 - Unpublished
 * 2- Published */
export const getStatusOptions = () => [
  {
    label: I18n.t('library_filter_tags_all_status'),
    value: 0,
  },
  {
    label: I18n.t('library_filter_tags_published'),
    value: PublishStatus.Published,
  },
  {
    label: I18n.t('library_filter_tags_unpublished'),
    value: PublishStatus.UnPublished,
  },
];

/** event type */
export const eventLibraryType = {
  [ResType.Plugin]: 'plugin',
  [ResType.Workflow]: 'workflow',
  [ResType.Imageflow]: 'imageflow',
  [ResType.Knowledge]: 'knowledge',
  [ResType.UI]: 'ui',
  [ResType.Prompt]: 'prompt',
  [ResType.Database]: 'database',
  [ResType.Variable]: 'variable',
  [ResType.Voice]: 'voice',
} as const;
