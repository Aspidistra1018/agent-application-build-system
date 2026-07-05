/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';

import { I18n } from '@coze-arch/i18n';
import { Toast } from '@coze-arch/coze-design';

export function useNavigateWorkflowOrBlockwise({
  spaceID,
  onNavigate2Edit,
}: Record<string, any>) {
  const navigateToWorkflow = useCallback(
    (workflowId?: string) => {
      if (!workflowId || workflowId === '0') {
        // Indicates dirty data, prompt and block the click event
        Toast.warning({
          content: I18n.t('workflow_error_jump_tip'),
          showClose: false,
        });
        return;
      } else {
        onNavigate2Edit(workflowId);
      }
    },
    [spaceID],
  );

  return {
    navigateToWorkflow,
  };
}
