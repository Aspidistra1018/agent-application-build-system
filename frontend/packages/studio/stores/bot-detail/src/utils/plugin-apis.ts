import { omit } from 'lodash-es';
import type { PluginApi } from '@coze-arch/bot-api/playground_api';

import { type EnabledPluginApi } from '../types/skill';

// Filter debug_example fields to avoid exceeding model resolution length
export const getPluginApisFilterExample = (
  pluginApis: PluginApi[],
): EnabledPluginApi[] => pluginApis.map(item => omit(item, 'debug_example'));

export const getSinglePluginApiFilterExample = (
  tool: PluginApi,
): EnabledPluginApi => omit(tool, 'debug_example');
