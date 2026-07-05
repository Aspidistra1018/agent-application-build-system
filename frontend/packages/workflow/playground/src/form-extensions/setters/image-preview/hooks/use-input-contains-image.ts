import { useCallback, useState } from 'react';

import { type FlowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import { ViewVariableType } from '@coze-workflow/base';

import { useRefVariablePathList } from './use-ref-variable-path-list';
import { useListenVariableChange } from './use-listen-variable-change';

export const useInputContainsImage = (node: FlowNodeEntity) => {
  const [inputContainsImage, setInputContainsImage] = useState(false);

  const variablePathList = useRefVariablePathList();

  const getInputContainsImage = useCallback(
    () =>
      variablePathList.some(path => {
        const variable = node.context.variableService.getViewVariableByKeyPath(
          path,
          { node },
        );
        return [
          ViewVariableType.Image,
          ViewVariableType.ArrayImage,
          ViewVariableType.Svg,
          ViewVariableType.ArraySvg,
        ].includes(variable?.type);
      }),
    [node, variablePathList],
  );

  // Trigger recalculation after listening for variable changes
  useListenVariableChange({
    variablePathList,
    callback: () => setInputContainsImage(getInputContainsImage()),
  });

  return inputContainsImage;
};
