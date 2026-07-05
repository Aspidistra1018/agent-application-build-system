import semver from 'semver';
import { type ApiNodeDataDTO } from '@coze-workflow/nodes';
import { type BotPluginWorkFlowItem } from '@coze-workflow/components';
import { BlockInput } from '@coze-workflow/base';
import { type PluginFrom } from '@coze-arch/bot-api/playground_api';

interface PluginApi {
  name: string;
  plugin_name: string;
  api_id: string;
  plugin_id: string;
  plugin_icon: string;
  desc: string;
  plugin_product_status: number;
  version_name?: string;
  version_ts?: string;
  plugin_from?: PluginFrom;
}

export const createApiNodeInfo = (
  apiParams: Partial<PluginApi> | undefined,
  templateIcon?: string,
): ApiNodeDataDTO => {
  const {
    name,
    plugin_name,
    api_id,
    plugin_id,
    desc,
    version_ts,
    plugin_from,
  } = apiParams || {};

  const result: ApiNodeDataDTO = {
    data: {
      nodeMeta: {
        title: name,
        icon: templateIcon,
        subtitle: `${plugin_name}:${name}`,
        description: desc,
      },
      inputs: {
        apiParam: [
          BlockInput.create('apiID', api_id),
          BlockInput.create('apiName', name),
          BlockInput.create('pluginID', plugin_id),
          BlockInput.create('pluginName', plugin_name),
          BlockInput.create('pluginVersion', version_ts || ''),
          BlockInput.create('tips', ''),
          BlockInput.create('outDocLink', ''),
        ],
      },
    },
  };

  // 开源版本，如果选择来自 Coze.cn 插件，设置 pluginSource 为 1
  if (IS_OPEN_SOURCE) {
    result.data.inputs.pluginFrom = plugin_from;
  }

  return result;
};

export const createSubWorkflowNodeInfo = ({
  workflowItem,
  spaceId,
  templateIcon,
  isImageflow,
}: {
  workflowItem: BotPluginWorkFlowItem | undefined;
  spaceId: string;
  isImageflow: boolean;
  templateIcon?: string;
}) => {
  const { name, workflow_id, desc, version_name } = workflowItem || {};

  const nodeJson = {
    data: {
      nodeMeta: {
        title: name,
        description: desc,
        icon: templateIcon,
        isImageflow,
      },
      inputs: {
        workflowId: workflow_id,
        spaceId,
        workflowVersion: semver.valid(version_name) ? version_name : '',
      },
    },
  };

  return nodeJson;
};
