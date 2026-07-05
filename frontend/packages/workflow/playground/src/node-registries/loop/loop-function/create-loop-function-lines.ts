import type { WorkflowDocument } from '@flowgram-adapter/free-layout-editor';
import { delay } from '@flowgram-adapter/common';

/** connect generation */
export const createLoopFunctionLines = async (params: {
  document: WorkflowDocument;
  loopId: string;
  loopFunctionId: string;
}) => {
  await delay(30); // Wait for the node to be created
  const { document, loopId, loopFunctionId } = params;
  document.linesManager.createLine({
    from: loopId,
    to: loopFunctionId,
    fromPort: 'loop-output-to-function',
    toPort: 'loop-function-input',
  });
};
