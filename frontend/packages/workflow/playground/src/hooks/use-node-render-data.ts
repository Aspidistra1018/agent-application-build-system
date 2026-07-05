import { useEffect, useState } from 'react';

import { pick } from 'lodash-es';
import { FlowNodeRenderData } from '@flowgram-adapter/free-layout-editor';
import { useCurrentEntity } from '@flowgram-adapter/free-layout-editor';
type SimpleNodeRenderData = Pick<FlowNodeRenderData, 'expanded' | 'node'>;

const pickSimpleNodeRenderData = (data: FlowNodeRenderData) =>
  pick(data, 'expanded', 'node');

/**
 * @deprecated
 * Get the rendering data of the current node, including expanded and other rendering-related states
 */
export const useNodeRenderData = () => {
  const node = useCurrentEntity();
  const initialRenderData =
    node.getData<FlowNodeRenderData>(FlowNodeRenderData);
  const [nodeRenderData, setNodeRenderData] = useState<SimpleNodeRenderData>(
    pickSimpleNodeRenderData(initialRenderData),
  );

  useEffect(() => {
    const disposable = initialRenderData.onDataChange(data => {
      setNodeRenderData(pickSimpleNodeRenderData(data as FlowNodeRenderData));
    });

    return () => {
      disposable?.dispose();
    };
  }, []);

  return {
    ...nodeRenderData,
    expanded: true, // Coze V2 has no node folding
    toggleNodeExpand: initialRenderData.toggleExpand.bind(initialRenderData),
  };
};
