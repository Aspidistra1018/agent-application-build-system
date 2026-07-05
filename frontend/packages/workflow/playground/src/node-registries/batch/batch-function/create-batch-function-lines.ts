import type { WorkflowDocument } from '@flowgram-adapter/free-layout-editor';
import { delay } from '@flowgram-adapter/common';

/** connect generation */
export const createBatchFunctionLines = async (params: {
  document: WorkflowDocument;
  batchId: string;
  batchFunctionId: string;
}) => {
  await delay(30); // Wait for the node to be created
  const { document, batchId, batchFunctionId } = params;
  document.linesManager.createLine({
    from: batchId,
    to: batchFunctionId,
    fromPort: 'batch-output-to-function',
    toPort: 'batch-function-input',
  });
};
