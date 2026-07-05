import ReactFlow, { ReactFlowProvider } from 'reactflow';
import { useMemo } from 'react';

import classNames from 'classnames';
import { Spin } from '@coze-arch/bot-semi';

import { type TopologyFlowProps } from './typing';

import 'reactflow/dist/style.css';
import { useGenerateTopology, useLayoutTopology } from './hook';
import { CUSTOM_EDGES, CUSTOM_NODES } from './constant/flow';

import s from './index.module.less';

const TopologyFlowContent = (props: TopologyFlowProps) => {
  const { style, className, renderHeader, ...restProps } = props;

  // Calculate topo data
  const [loading, topologicalData] = useGenerateTopology({
    ...restProps,
  });

  // After each topo data change, calculate the topo layout information
  const [topologyFlowDomRef] = useLayoutTopology(topologicalData);

  // Rendering external custom header implementations (with business semantics)
  const topologyHeader = useMemo(() => {
    if (!renderHeader || !topologicalData) {
      return null;
    }
    return renderHeader(topologicalData.topoType);
  }, [renderHeader, topologicalData]);

  return topologicalData ? (
    <div
      className={classNames(
        s['topology-flow'],
        className ?? s['topology-flow_default'],
      )}
      style={style}
      ref={topologyFlowDomRef}
    >
      {loading ? (
        <div className={s['topology-flow-loading']}>
          <Spin />
        </div>
      ) : (
        <div className={s['topology-flow-container']}>
          {topologyHeader}
          <div className={s['topology-flow-container-flow']}>
            <ReactFlow
              // @ts-expect-error Use the number type to enumerate SpanType as a custom type, the error can be ignored
              nodes={topologicalData.nodes}
              edges={topologicalData.edges}
              nodeTypes={CUSTOM_NODES}
              edgeTypes={CUSTOM_EDGES}
              proOptions={{
                hideAttribution: true,
              }}
              nodesDraggable={false}
              nodesConnectable={false}
            />
          </div>
        </div>
      )}
    </div>
  ) : null;
};

const TopologyFlow = (props: TopologyFlowProps) => (
  <ReactFlowProvider>
    <TopologyFlowContent {...props} />
  </ReactFlowProvider>
);

export default TopologyFlow;
