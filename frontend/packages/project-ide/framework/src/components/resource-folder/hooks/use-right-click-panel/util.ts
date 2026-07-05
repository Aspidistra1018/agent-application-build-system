import { type RightPanelConfigType } from '../../type';
import { ContextMenuConfigMap } from './constant';

/**
 * The main replacement resource tree is supported by default, right-click menu configuration,
 * And wraps the id of the right-click menu injected by the three parties.
 */
export const handleConfig = (
  baseConfig: RightPanelConfigType[],
): RightPanelConfigType[] =>
  baseConfig.map(config => {
    if ('type' in config) {
      return config;
    }
    if (ContextMenuConfigMap[config.id]) {
      return {
        ...ContextMenuConfigMap[config.id],
        ...config,
        id: config.id,
      };
    }
    return {
      ...config,
      id: config.id,
    };
  });
