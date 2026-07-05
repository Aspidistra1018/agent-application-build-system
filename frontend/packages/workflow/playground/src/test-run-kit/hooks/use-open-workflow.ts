/** Pick from master, if there is any conflict, please refer to master */
import { useGlobalState } from '@/hooks';

/**
 * Open workflow
 * TODO: Some dependencies have not been migrated yet. For the time being, put this hook here first, and you need to migrate later.
 */
export const useOpenWorkflow = () => {
  const { projectId, getProjectApi } = useGlobalState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const open = (data: any) => {
    const { workflowId, executeId, subExecuteId } = data;
    const projectApi = getProjectApi();

    if (projectId && projectApi) {
      // in-app jump
      projectApi.sendMsgOpenWidget(`/workflow/${workflowId}`, {
        name: 'debug',
        data: {
          executeId,
          subExecuteId,
        },
      });
    } else {
      // Resource library or operation and maintenance platform jump
      const url = new URL(window.location.href);
      const params = new URLSearchParams();

      // Add/update query parameters to keep only these 4 parameters, including space_id
      params.append('space_id', url.searchParams.get('space_id') || '0');
      params.append('workflow_id', workflowId);
      params.append('execute_id', executeId);
      params.append('sub_execute_id', subExecuteId);

      // Build a new URL
      url.search = params.toString();

      // Open in a new tab
      window.open(url.toString(), '_blank');
    }
  };

  return { open };
};
