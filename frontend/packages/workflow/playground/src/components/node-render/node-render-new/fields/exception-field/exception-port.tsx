import { useEffect } from 'react';

import {
  useCurrentEntity,
  WorkflowNodePortsData,
} from '@flowgram-adapter/free-layout-editor';
import {
  isSettingOnErrorDynamicPort,
  SETTING_ON_ERROR_PORT,
} from '@coze-workflow/nodes';
import { type StandardNodeType } from '@coze-workflow/base';

import { Port } from '../port';

/**
 * abnormal port
 */
export function ExceptionPort() {
  const node = useCurrentEntity();
  const portsData = node.getData<WorkflowNodePortsData>(WorkflowNodePortsData);

  useEffect(() => {
    // Nodes for dynamic ports
    if (isSettingOnErrorDynamicPort(node.flowNodeType as StandardNodeType)) {
      portsData.updateDynamicPorts();
      return;
    }

    // Node on static port
    portsData.updateStaticPorts([
      { type: 'input' },
      { type: 'output', portID: 'default' },
    ]);
  }, [node, portsData]);

  return <Port id={SETTING_ON_ERROR_PORT} type="output" />;
}
