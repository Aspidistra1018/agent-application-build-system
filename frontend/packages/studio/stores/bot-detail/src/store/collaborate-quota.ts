import { logger } from '@coze-arch/logger';
import { useSpaceStore } from '@coze-arch/bot-studio-store';
import { SpaceType } from '@coze-arch/bot-api/developer_api';
import { PlaygroundApi } from '@coze-arch/bot-api';

import { getBotDetailIsReadonly } from '../utils/get-read-only';
import { useBotInfoStore } from '../store/bot-info';
import { useCollaborationStore } from './collaboration';

export const collaborateQuota = async () => {
  try {
    const { botId } = useBotInfoStore.getState();
    const { inCollaboration, setCollaboration } =
      useCollaborationStore.getState();
    const {
      space: { space_type },
    } = useSpaceStore.getState();
    const isPersonal = space_type === SpaceType.Personal;

    const isReadOnly = getBotDetailIsReadonly();
    if (isReadOnly || isPersonal) {
      return;
    }
    const { data: collaborationQuota } =
      await PlaygroundApi.GetBotCollaborationQuota({
        bot_id: botId,
      });
    setCollaboration({
      // Multiplayer collaboration mode, or non-multiplayer collaboration mode can be enabled when there is a quota
      openCollaboratorsEnable:
        (!inCollaboration && collaborationQuota?.open_collaborators_enable) ||
        inCollaboration,
      // Non-multiplayer collaboration mode & & If the package can be upgraded, the upgrade package button will be displayed.
      canUpgrade: collaborationQuota?.can_upgrade || false,
      // Limit on the maximum number of user-enabled multiplayer collaborative bots
      maxCollaborationBotCount:
        collaborationQuota?.max_collaboration_bot_count || 0,
      maxCollaboratorsCount: collaborationQuota?.max_collaborators_count || 0,
      currentCollaborationBotCount:
        collaborationQuota.current_collaboration_bot_count || 0,
    });
  } catch (error) {
    const e = error instanceof Error ? error : new Error(error as string);
    logger.error({ error: e });
  }
};
