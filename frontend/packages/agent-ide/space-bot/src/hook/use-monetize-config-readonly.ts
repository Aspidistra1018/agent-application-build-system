import { userStoreService } from '@coze-studio/user-store';
import { useBotInfoStore } from '@coze-studio/bot-detail-store/bot-info';
import { useBotDetailIsReadonly } from '@coze-studio/bot-detail-store';

/**
 * Is the bot paid configuration editable?
 *
 * The difference between whether the bot is editable: the author himself can edit, and collaborators with bot editing rights cannot modify the paid configuration
 */
export function useMonetizeConfigReadonly() {
  const userId = userStoreService.useUserInfo()?.user_id_str;
  const botCreatorId = useBotInfoStore(s => s.creator_id);
  const botDetailReadonly = useBotDetailIsReadonly();
  const isSelf = userId === botCreatorId;
  return botDetailReadonly || !isSelf;
}
