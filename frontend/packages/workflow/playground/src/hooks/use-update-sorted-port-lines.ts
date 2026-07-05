import {
  WorkflowNodePortsData,
  useCurrentEntity,
} from '@flowgram-adapter/free-layout-editor';

import { useLineService } from './use-line-service';

/**
 * After the port ordering is updated, it needs to be reconnected.
 *
 * In the case of multiple ports, index is used as the portId instead of the uid.
 *
 * When the port ordering changes, the index does not change. If you want the connection and data to remain consistent, you can only reconnect.
 *
 * */
export const useUpdateSortedPortLines = (
  calcPortId: (index: number) => string,
) => {
  const node = useCurrentEntity();

  const lineService = useLineService();

  /**
   *  Reconnect all the connections between gastIndex and endIndex
   *  Interacting in pairs, for example:
   *
   *  0 1 2
   *
   *  1 0 2
   *
   *  1 2 0
   * */
  const updateSortedPortLines = (startIndex: number, endIndex: number) => {
    if (startIndex === endIndex) {
      return;
    }

    const step = startIndex < endIndex ? 1 : -1;

    for (let i = startIndex; i !== endIndex; i += step) {
      const oldPortInfo = {
        from: node.id,
        fromPort: calcPortId(i),
      };
      const newPortInfo = {
        from: node.id,
        fromPort: calcPortId(i + step),
      };
      lineService.replaceLineByPort(oldPortInfo, newPortInfo);
    }

    // After the drag ends, the portId corresponding to the port dom changes and needs to be updated.
    node
      .getData<WorkflowNodePortsData>(WorkflowNodePortsData)
      .updateDynamicPorts();
  };

  return updateSortedPortLines;
};
