import { useState } from 'react';

import { isEqual } from 'lodash-es';
import { useCurrentEntity } from '@flowgram-adapter/free-layout-editor';
import {
  type StandardNodeType,
  useWorkflowNode,
  type RefExpressionContent,
} from '@coze-workflow/base';

import { isInputAsOutput } from '../utils';

/**
 * Get the list of reference variable paths in node inputs
 */
export const useRefVariablePathList = () => {
  const workflowNode = useWorkflowNode();
  const [pathList, setPathList] = useState<Array<Array<string>>>([]);
  const node = useCurrentEntity();

  // Non-target nodes directly return an empty list to avoid unnecessary listening
  if (!isInputAsOutput(node?.flowNodeType as StandardNodeType)) {
    return [];
  }

  const { inputParameters } = workflowNode || {};
  const keyPathList = (inputParameters || []).reduce(
    (list: Array<Array<string>>, i) => {
      if (i.input?.type === 'ref') {
        const variablePath = (i.input.content as RefExpressionContent)?.keyPath;

        if (variablePath) {
          return [...list, variablePath];
        }
      }
      return list;
    },
    [],
  );

  if (!isEqual(pathList, keyPathList)) {
    setPathList(keyPathList);
  }

  return pathList;
};
