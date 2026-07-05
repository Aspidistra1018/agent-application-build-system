import { useCurrentEntity } from '@flowgram-adapter/free-layout-editor';

/**
 * Get the current node id, if it returns undefined, it represents the node context that is not in multi mode
 *
 * Q1: Should this hook be placed under the multi-agent module?
 * A1: A similar hook exists under the multi-agent module.
 *    It is proposed separately to avoid unreasonable import paths when some components that are reused in both single and multi need to use node id.
 *
 * Q2: For components that are reused in both single and multi, should the caller pass in the node id?
 * A2: Ideal. Some component business logic is too complex, and the depth of parameters passed by the caller will be slightly exaggerated, such as the workflow pop-up window of the bot.
 */
export function useCurrentNodeId() {
  let nodeId: string | undefined;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- no conditional call to hook
    nodeId = useCurrentEntity().id;
    // eslint-disable-next-line @coze-arch/use-error-in-catch -- SDK meets expected errors, no additional processing required
  } catch {
    nodeId = undefined;
  }
  return nodeId;
}
