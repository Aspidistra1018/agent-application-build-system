import { type AbilityKey } from '@coze-agent-ide/tool-config';

import { useEvent } from '../event/use-event';
import { EventCenterEventName } from '../../typings/scoped-events';
import { type IToggleContentBlockEventParams } from '../../typings/event';

/**
 * Private hooks, not exposed to the outside world
 * @returns
 */

export const useRegisterCollapse = () => {
  const { on } = useEvent();

  const registerCollapse = (
    listener: (isExpand: boolean) => void,
    abilityKey: AbilityKey,
  ) =>
    on<IToggleContentBlockEventParams>(
      EventCenterEventName.ToggleContentBlock,
      params => {
        const { abilityKey: currentAbilityKey, isExpand } = params;

        if (abilityKey === currentAbilityKey) {
          listener(isExpand);
        }
      },
    );

  return {
    registerCollapse,
  };
};
