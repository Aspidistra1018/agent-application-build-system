import { useCallback, useMemo, useState, useEffect } from 'react';

import {
  workflowApi,
  UserBehaviorType,
  AuthType,
} from '@coze-workflow/base/api';
import { I18n } from '@coze-arch/i18n';

// eslint-disable-next-line @coze-arch/no-deep-relative-import
import { useGlobalState } from '../../../../hooks';
import { CollaborationCloseIntroduction } from './introduction';

interface Limit {
  workflow?: number;
  collaborators?: number;
}

const fetchCollaboratorsPayPass = async ({ workflowId, spaceId }) => {
  const { data } = await workflowApi.UserBehaviorAuth({
    workflow_id: workflowId,
    space_id: spaceId,
    action_type: UserBehaviorType.OpenCollaborators,
    only_config_item: false,
  });
  const pass = data?.auth_type === AuthType.Pass;
  const canUpdate = data?.can_upgrade;
  const workflowCount = data?.config.workflow_count;
  const collaboratorsCount = data?.config.collaborators_count;

  return {
    pass,
    canUpdate,
    workflowCount,
    collaboratorsCount,
  };
};

const useCollaboratorsPay = () => {
  const globalState = useGlobalState();
  const { workflowId, spaceId, isCollaboratorMode } = globalState;
  // The release version is only charged.
  const isNeedPay = IS_RELEASE_VERSION;
  // Whether to allow multi-person collaboration
  const [disabledOpen, setDisabledOpen] = useState(isNeedPay ? true : false);
  const [limit, setLimit] = useState<Limit | null>(null);

  const textMap = useMemo(
    () => ({
      // Collaborators can jointly edit, commit changes, and publish workflows.
      titleTooltip: I18n.t('wmv_collaborate_collabration_explain'),
      intro: <CollaborationCloseIntroduction />,
      // Determine whether the enable button needs to be disabled only if it is not enabled
      disableTooltip:
        !isCollaboratorMode && disabledOpen
          ? I18n.t('bz_upgrade_detail')
          : undefined,
    }),
    [disabledOpen, isCollaboratorMode],
  );

  const text = useMemo(() => {
    if (!limit) {
      return undefined;
    }
    if (isCollaboratorMode) {
      return {
        title: I18n.t('bz_upgrade_detail'),
        desc: I18n.t('bz_coop_upgrade_for_more', {
          max_coop: limit.collaborators,
        }),
        button: I18n.t('bz_upgrade_button'),
      };
    }
    return {
      title: I18n.t('bz_upgrade_detail'),
      desc: I18n.t('bz_reache_max', {
        type_name: 'Workflow',
        max_cnt: limit.workflow,
      }),
      button: I18n.t('bz_upgrade_button'),
    };
  }, [isCollaboratorMode, limit]);

  const fetch = useCallback(async () => {
    setLimit(null);
    const { pass, canUpdate, workflowCount, collaboratorsCount } =
      await fetchCollaboratorsPayPass({ workflowId, spaceId });

    /** Can't continue to upgrade, highlight block is not displayed */
    if (!canUpdate) {
      setLimit(null);
    } else {
      setLimit({
        workflow: workflowCount,
        collaborators: collaboratorsCount,
      });
    }

    setDisabledOpen(!pass);
  }, [workflowId, spaceId]);

  useEffect(() => {
    if (isNeedPay) {
      fetch();
    }
  }, [fetch, isNeedPay, isCollaboratorMode]);

  return {
    text,
    textMap,
  };
};

export { useCollaboratorsPay };
