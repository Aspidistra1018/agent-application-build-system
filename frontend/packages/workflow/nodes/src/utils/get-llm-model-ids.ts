import {
  type WorkflowNodeJSON,
  type WorkflowJSON,
  type WorkflowDocument,
} from '@flowgram-adapter/free-layout-editor';
import { type WorkflowNodeRegistry } from '@coze-workflow/base';

/**
 * Get the large model id according to the getLLMModelIdsByNodeJSON method defined in node meta
 * @param nodeJSON
 * @param ids
 * @param document
 */
function getLLMModelIdsByNodeJSON(
  nodeJSON: WorkflowNodeJSON,
  ids: string[],
  document: WorkflowDocument,
) {
  const registry = document.getNodeRegistry(
    nodeJSON.type,
  ) as WorkflowNodeRegistry;

  const res = registry?.meta?.getLLMModelIdsByNodeJSON?.(nodeJSON);

  if (res) {
    const modelIds = Array.isArray(res) ? res : [res];
    modelIds.filter(Boolean).forEach(modelId => {
      const idstr = `${modelId}`;
      if (!ids.includes(idstr)) {
        ids.push(idstr);
      }
    });
  }

  if (nodeJSON.blocks) {
    nodeJSON.blocks.forEach(block =>
      getLLMModelIdsByNodeJSON(block, ids, document),
    );
  }
}

/**
 * Get model ids
 * @param json
 * @param document
 * @returns
 */
export function getLLMModelIds(
  json: WorkflowJSON,
  document: WorkflowDocument,
): string[] {
  const ids = [];

  if (!document) {
    return ids;
  }

  json.nodes.forEach(node => {
    getLLMModelIdsByNodeJSON(node, ids, document);
  });
  return ids;
}
