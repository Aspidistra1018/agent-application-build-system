import 'reflect-metadata';
import React, { useRef, useState } from 'react';

import { WorkflowPlayground } from '@coze-workflow/playground/workflow-playground';
import {
  type AddNodeRef,
  type WorkflowPlaygroundRef,
} from '@coze-workflow/playground/typing';

import { usePageParams } from './hooks/use-page-params';
import { useNavigateBack } from './hooks';

// The added node is placed in the toolbar, but the original sidebar is no longer needed.
const EmptySidebar = React.forwardRef<AddNodeRef, unknown>(
  (_props, _addNodeRef) => null,
);

export function WorkflowPage(): React.ReactNode {
  const workflowPlaygroundRef = useRef<WorkflowPlaygroundRef>(null);
  const {
    spaceId,
    workflowId,
    version,
    setVersion,
    from,
    optType,
    nodeId,
    executeId,
    subExecuteId,
  } = usePageParams();

  const [initOnce, setInitOnce] = useState(false);
  const { navigateBack } = useNavigateBack();

  /** Whether it is read-only mode, derived from the process exploration module */
  const readonly = from === 'explore';

  if (!workflowId || !spaceId) {
    return null;
  }

  return (
    <>
      <WorkflowPlayground
        ref={workflowPlaygroundRef}
        sidebar={EmptySidebar}
        workflowId={workflowId}
        spaceId={spaceId}
        commitId={setVersion ? undefined : version}
        commitOptType={setVersion ? undefined : optType}
        readonly={readonly}
        executeId={executeId}
        subExecuteId={subExecuteId}
        onInit={_workflowState => {
          if (setVersion && version) {
            workflowPlaygroundRef.current?.resetToHistory({
              commitId: version,
              optType,
            });
          }

          // onInit may be called multiple times, it only needs to be executed once
          if (!initOnce) {
            // Read the node_id parameters on the link and scroll to the corresponding node
            if (nodeId) {
              workflowPlaygroundRef.current?.scrollToNode(nodeId);
            }

            // Read execute_id show the corresponding execution result
            if (executeId) {
              workflowPlaygroundRef.current?.showTestRunResult(
                executeId,
                subExecuteId,
              );
            }

            setInitOnce(true);
          }
        }}
        from={from}
        onBackClick={workflowState => {
          navigateBack(workflowState, 'exit');
        }}
        onPublish={workflowState => {
          navigateBack(workflowState, 'publish');
        }}
      />
    </>
  );
}
