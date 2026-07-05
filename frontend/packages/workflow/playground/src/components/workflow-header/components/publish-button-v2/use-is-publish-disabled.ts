import { useMemo } from 'react';

import { I18n } from '@coze-arch/i18n';
import { VCSCanvasType } from '@coze-arch/bot-api/workflow_api';

import { useGlobalState } from '@/hooks';

/**
 * Summarize cases where the publish button is not available:
 * 1. The process is running or saved and cannot be published
 * 2. In multiplayer mode, the process is not submitted and cannot be published
 * 3. In vcs mode, the process has already been published and cannot be published.
 * 4.DB mode has no other restrictions and can be released at will
 */
export const useIsPublishDisabled = () => {
  const { isCollaboratorMode, isExecuting, isVcsMode, config, info } =
    useGlobalState();
  const { vcsData } = info;
  const { saving } = config;

  const disabled = useMemo(() => {
    // Processes in progress or saved cannot be published
    if (isExecuting || saving) {
      return true;
    }
    // Multiplayer Collaboration Mode: The process is committed and the process is publishable
    if (isCollaboratorMode) {
      const canPublish = vcsData?.type === VCSCanvasType.Submit;
      return !canPublish;
    }
    if (isVcsMode && vcsData?.type === VCSCanvasType.Publish) {
      return true;
    }

    return false;
  }, [isExecuting, saving, isVcsMode, isCollaboratorMode, vcsData]);

  const tooltip = useMemo(() => {
    if (isCollaboratorMode) {
      return I18n.t('workflow_publish_multibranch_publish_disabled_tooltip');
    }
    if (isVcsMode && vcsData?.type === VCSCanvasType.Publish) {
      return I18n.t('workflow_no_change_tooltip');
    }
  }, [vcsData, isCollaboratorMode, isVcsMode]);

  return { disabled, tooltip };
};
