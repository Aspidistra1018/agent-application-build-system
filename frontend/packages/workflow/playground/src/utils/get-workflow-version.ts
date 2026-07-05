import { PluginType } from '@coze-arch/bot-api/plugin_develop';
import { PluginDevelopApi } from '@coze-arch/bot-api';
/**
 * Get the version number of the workflow according to the pluginId of the workflow.
 */
export const getWorkflowVersionByPluginId = async ({
  spaceId,
  pluginId,
}: {
  spaceId: string;
  pluginId?: string;
}) => {
  if (!pluginId || pluginId === '0') {
    return;
  }
  const resp = await PluginDevelopApi.GetPlaygroundPluginList(
    {
      space_id: spaceId,
      page: 1,
      size: 1,
      plugin_ids: [pluginId],
      plugin_types: [PluginType.WORKFLOW, PluginType.IMAGEFLOW],
    },
    {
      __disableErrorToast: true,
    },
  );

  // Complete version information
  const versionName = resp.data?.plugin_list?.[0]?.version_name;
  return versionName;
};
