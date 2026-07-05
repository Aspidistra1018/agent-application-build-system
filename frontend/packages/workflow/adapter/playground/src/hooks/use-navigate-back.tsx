import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import { type WorkflowGlobalStateEntity } from '@coze-workflow/playground';
import { type WorkflowMode, workflowApi } from '@coze-workflow/base/api';
import { reporter } from '@coze-arch/logger';
import {
  usePageJumpResponse,
  PageType,
  usePageJumpService,
  SceneType,
} from '@coze-arch/bot-hooks';
import { CustomError } from '@coze-arch/bot-error';

const MAX_HISTORY_COUNT = 2;

const hasHistory = (): boolean =>
  Boolean(
    window.history.length > MAX_HISTORY_COUNT && window.document?.referrer,
  );

type NavigateScene = 'publish' | 'exit';

/**
 * Return to previous page logic
 */
export const useNavigateBack = () => {
  const pageJumpResponse = usePageJumpResponse(PageType.WORKFLOW);
  const { jump } = usePageJumpService();
  const navigate = useNavigate();

  /** Process details page route update will invalidate pageJumpResponse, so you need to cache a copy of the original version */
  const memoPageJumpResponse = useMemo(() => pageJumpResponse, []);

  const navigateBack = async (
    workflowState: WorkflowGlobalStateEntity,
    scene: NavigateScene,
  ) => {
    reporter.event({
      namespace: 'workflow',
      eventName: 'workflow_navigate_back',
    });

    const { spaceId, info, workflowId, flowMode } = workflowState;
    const { plugin_id } = info;
    if (!spaceId || !workflowId) {
      reporter.errorEvent({
        namespace: 'workflow',
        eventName: 'workflow_navigate_back_failed',
        error: new CustomError(
          'navigate_back_failed',
          'no spaceId or workflowId',
        ),
      });
      return;
    }

    // Jump back to the bot details page with scene parameters
    if (memoPageJumpResponse?.scene) {
      if (scene === 'publish') {
        let pluginID = plugin_id;

        // When you publish the process for the first time, you need to retrieve the pluginID from the interface again.
        if (!pluginID || pluginID === '0') {
          const workflowRes = await workflowApi.GetCanvasInfo(
            {
              workflow_id: workflowId,
              space_id: spaceId,
            },
            {
              __disableErrorToast: true,
            },
          );
          pluginID = workflowRes.data?.workflow?.plugin_id || '0';
        }

        if (
          memoPageJumpResponse.scene === SceneType.BOT__VIEW__WORKFLOW &&
          memoPageJumpResponse.botID
        ) {
          const { botID, agentID, workflowOpenMode } = memoPageJumpResponse;
          reporter.event({
            namespace: 'workflow',
            eventName: 'workflow_navigate_back_to_bot',
          });
          jump(SceneType.WORKFLOW_PUBLISHED__BACK__BOT, {
            spaceID: spaceId,
            botID,
            workflowID: workflowId,
            pluginID,
            agentID,
            workflowOpenMode,
            flowMode: flowMode as WorkflowMode,
          });
          return;
        }
      }

      if (scene === 'exit') {
        if (
          memoPageJumpResponse.scene === SceneType.BOT__VIEW__WORKFLOW &&
          memoPageJumpResponse.botID
        ) {
          const { botID, agentID, workflowOpenMode, workflowModalState } =
            memoPageJumpResponse;
          jump(SceneType.WORKFLOW__BACK__BOT, {
            spaceID: spaceId,
            botID,
            workflowModalState,
            agentID,
            workflowOpenMode,
            flowMode: flowMode as WorkflowMode,
          });
          return;
        }
      }
    }

    if (hasHistory()) {
      reporter.event({
        namespace: 'workflow',
        eventName: 'workflow_navigate_back_to_history',
      });
      navigate(-1);
    } else {
      reporter.event({
        namespace: 'workflow',
        eventName: 'workflow_navigate_back_to_list',
      });
      // If history is only one page, navigate (-1) does not take effect at this time, you need to manually specify the path
      // At present, the dead path is written first. The disadvantage is that it needs to be changed with the change of the page structure, and then optimized for a better implementation later.
      // /library coze 2.0 mixed resource list page
      navigate(`/space/${spaceId}/library`);
    }
  };

  return {
    navigateBack,
  };
};
