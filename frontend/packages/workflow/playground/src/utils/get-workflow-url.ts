const workflowPath = 'work_flow';

/**
 * Get Workflow page url
 * @param params related parameters
 * @returns Workflow page url
 */
export const getWorkflowUrl = (params: {
  space_id: string;
  workflow_id: string;
  version?: string;
}) => {
  const urlParams = new URLSearchParams(params);
  return `/${workflowPath}?${urlParams.toString()}`;
};
