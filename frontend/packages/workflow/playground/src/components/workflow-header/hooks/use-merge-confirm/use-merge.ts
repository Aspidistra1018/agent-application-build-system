import { useContext } from 'react';

import { workflowApi } from '@coze-workflow/base';
import { reporter } from '@coze-arch/logger';
import { sendTeaEvent, EVENT_NAMES } from '@coze-arch/bot-tea';

import { DiffItems, MERGE_KEY_MAP } from '../../constants';
import { MergeContext } from './merge-context';

export const useMerge = () => {
  const context = useContext(MergeContext);

  const handleMerge = async (): Promise<boolean> => {
    try {
      const { workflowId, spaceId, retainedResult, submitDiff, draftDiff } =
        context;

      sendTeaEvent(EVENT_NAMES.workflow_merge, {
        workflow_id: workflowId,
        workspace_id: spaceId,
        merge_type: retainedResult[DiffItems.Schema] || '',
      });

      const mergeResults = Object.values(DiffItems).reduce((result, key) => {
        let mergeResult;
        // No conflict, choose the latest
        if (!retainedResult[key]) {
          if (submitDiff?.[key]?.modify) {
            mergeResult = submitDiff?.[key]?.after;
          } else {
            mergeResult = draftDiff?.[key]?.after;
          }
        } else {
          // If there is a conflict, choose the corresponding one.
          if (retainedResult[key] === 'submit') {
            mergeResult = submitDiff?.[key]?.after;
          } else {
            mergeResult = draftDiff?.[key]?.after;
          }
        }

        return {
          ...result,
          [MERGE_KEY_MAP[key]]: mergeResult,
        };
      }, {});

      await workflowApi.MergeWorkflow({
        workflow_id: workflowId,
        space_id: spaceId,
        submit_commit_id: submitDiff?.name_dif?.after_commit_id || '',
        ...mergeResults,
      });
      reporter.successEvent({
        eventName: 'workflow_merge_success',
        namespace: 'workflow',
      });
      return true;
    } catch (error) {
      reporter.errorEvent({
        eventName: 'workflow_merge_fail',
        namespace: 'workflow',
        error,
      });
      return false;
    }
  };

  return { ...context, handleMerge };
};
