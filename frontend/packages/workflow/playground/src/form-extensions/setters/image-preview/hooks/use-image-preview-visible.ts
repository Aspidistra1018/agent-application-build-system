import { type FlowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import { useCurrentEntity } from '@flowgram-adapter/free-layout-editor';
import { StandardNodeType } from '@coze-workflow/base';

import { isInputAsOutput, isOutputsContainsImage } from '../utils';
import { useInputContainsImage } from './use-input-contains-image';

/**
 * According to the input and output of the node, determine whether to display the picture preview module
 */
export const useImagePreviewVisible = () => {
  const node: FlowNodeEntity = useCurrentEntity();

  const { flowNodeType } = node;

  const inputContainsImage = useInputContainsImage(node);

  // The starting node is not required
  if (flowNodeType === StandardNodeType.Start) {
    return false;
  }

  // The input of the end node and the message node is the output. When the input refers to the image type, it needs to be displayed
  if (isInputAsOutput(flowNodeType as StandardNodeType)) {
    return inputContainsImage;
  } else {
    // When the output contains a picture type, it needs to be displayed
    return isOutputsContainsImage(node);
  }
};
