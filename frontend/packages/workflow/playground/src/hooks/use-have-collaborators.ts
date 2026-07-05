import { useEffect, useState } from 'react';

import { PUBLIC_SPACE_ID } from '@coze-workflow/base/constants';
import { workflowApi } from '@coze-workflow/base';

import { useGlobalState } from './use-global-state';

// Determine if there are currently collaborators
export function useHaveCollaborators() {
  const { spaceId, workflowId } = useGlobalState();
  const [haveCollaborators, setHaveCollaborators] = useState<
    boolean | undefined
  >();

  useEffect(() => {
    if (spaceId === PUBLIC_SPACE_ID) {
      setHaveCollaborators(false);
      return;
    }

    workflowApi
      .ListCollaborators(
        {
          workflow_id: workflowId,
          space_id: spaceId,
        },
        {
          __disableErrorToast: true,
        },
      )
      .then(({ data }) => {
        setHaveCollaborators(data.length > 1);
      });
  });

  return haveCollaborators;
}
