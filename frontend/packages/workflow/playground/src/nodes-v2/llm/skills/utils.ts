import { type BoundSkills } from './types';

/**
 * Determine whether it is a draft according to the projectId
 * Plugins in library project_id = '0'
 */
export function isDraftByProjectId(projectId?: string) {
  return projectId && projectId !== '0' ? true : false;
}

/**
 * Is the skill empty?
 * @param value
 * @returns
 */
export function isSkillsEmpty(value: BoundSkills) {
  return (
    !value.pluginFCParam?.pluginList?.length &&
    !value.workflowFCParam?.workflowList?.length &&
    !value.knowledgeFCParam?.knowledgeList?.length
  );
}

/**
 * Get skill query parameters
 * @param fcParam
 * @returns
 */
export function getSkillsQueryParams(boundSkills?: BoundSkills) {
  return {
    plugin_list: boundSkills?.pluginFCParam?.pluginList?.map(item => ({
      plugin_id: item.plugin_id,
      api_id: item.api_id,
      api_name: item.api_name,
      is_draft: item.is_draft,
      plugin_version: item.plugin_version,
      plugin_from: item.plugin_from,
    })),
    workflow_list: boundSkills?.workflowFCParam?.workflowList?.map(item => ({
      workflow_id: item.workflow_id,
      plugin_id: item.plugin_id,
      is_draft: item.is_draft,
      workflow_version: item.workflow_version,
    })),
    dataset_list: boundSkills?.knowledgeFCParam?.knowledgeList?.map(item => ({
      dataset_id: item.id,
      is_draft: false,
    })),
  };
}
