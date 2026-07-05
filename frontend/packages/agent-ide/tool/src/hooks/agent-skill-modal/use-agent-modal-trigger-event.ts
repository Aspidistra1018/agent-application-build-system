import { type AgentModalTabKey } from '@coze-agent-ide/tool-config';

import { useEvent } from '../event/use-event';
import { EventCenterEventName } from '../../typings/scoped-events';
import {
  type IAgentModalTabChangeEventParams,
  type IAgentModalVisibleChangeEventParams,
} from '../../typings/event';

/**
 * Methods used internally, not externally, for throwing events
 */
export const useAgentModalTriggerEvent = () => {
  const { emit } = useEvent();

  const emitTabChangeEvent = (tabKey: AgentModalTabKey) => {
    emit<IAgentModalTabChangeEventParams>(
      EventCenterEventName.AgentModalTabChange,
      { tabKey },
    );
  };

  const emitModalVisibleChangeEvent = (isVisible: boolean) => {
    emit<IAgentModalVisibleChangeEventParams>(
      EventCenterEventName.AgentModalVisibleChange,
      {
        isVisible,
      },
    );
  };

  return { emitTabChangeEvent, emitModalVisibleChangeEvent };
};
