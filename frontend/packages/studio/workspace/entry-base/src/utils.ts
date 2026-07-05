import qs from 'qs';
import { pick } from 'lodash-es';
import { type PluginNavType } from '@coze-studio/bot-plugin-store/src/context';

/**
 * Compares two objects for equality, comparing only the specified key, implemented by JSON.stringify
 * @param obj1
 * @param obj2
 * @Param keys The key to compare
 * @Returns is equal
 */
export function compareObjects<T>(
  obj1: T,
  obj2: T,
  keys: (keyof T)[],
): boolean {
  const subset1 = pick(obj1, keys);
  const subset2 = pick(obj2, keys);
  return JSON.stringify(subset1) === JSON.stringify(subset2);
}

export function resourceNavigate(
  navBase: string,
  pluginID: string,
  navigate: Function,
): PluginNavType {
  return {
    // eslint-disable-next-line max-params
    toResource: (resource, rid, query, opts) =>
      rid
        ? navigate(`${navBase}/${resource}/${rid}?${qs.stringify(query)}`, opts)
        : '',
    tool: (toolID, query, opts) =>
      navigate(
        `${navBase}/plugin/${pluginID}/tool/${toolID}?${qs.stringify(query)}`,
        opts,
      ),
    mocksetList: (toolID, query, opts) =>
      navigate(
        `${navBase}/plugin/${pluginID}/tool/${toolID}/plugin-mock-set?${qs.stringify(
          query,
        )}`,
        opts,
      ),
    // eslint-disable-next-line max-params
    mocksetDetail: (toolID, mocksetID, query, opts) =>
      navigate(
        `${navBase}/plugin/${pluginID}/tool/${toolID}/plugin-mock-set/${mocksetID}?${qs.stringify(
          query,
        )}`,
        opts,
      ),
    cloudIDE: (query, opts) =>
      navigate(
        `${navBase}/plugin/${pluginID}/cloud-tool?${qs.stringify(query)}`,
        opts,
      ),
  };
}
