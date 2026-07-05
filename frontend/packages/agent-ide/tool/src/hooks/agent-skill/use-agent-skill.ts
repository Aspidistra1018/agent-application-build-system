import { useShallow } from 'zustand/react/shallow';
import { type AgentSkillKey } from '@coze-agent-ide/tool-config';

import { useAbilityAreaContext } from '../../context/ability-area-context';

/**
 * @Deprecated internal use, transition scenario, using external skill settings for non-registered components
 */
export const useHasAgentSkillWithPK = () => {
  const {
    store: { useAgentAreaStore },
  } = useAbilityAreaContext();

  const { existManualAgentSkillKey, realSetHasAgentSkill } = useAgentAreaStore(
    state => ({
      existManualAgentSkillKey: state.existManualAgentSkillKey,
      realSetHasAgentSkill: state.setHasAgentSkillKey,
    }),
  );

  /**
   * @deprecated internal use, transition period
   */
  const setHasAgentSkill = (
    agentSkillKey: AgentSkillKey,
    hasSkill: boolean,
  ) => {
    const isManual = existManualAgentSkillKey(agentSkillKey);

    if (!isManual) {
      realSetHasAgentSkill(agentSkillKey, hasSkill);
    }
  };

  return {
    setHasAgentSkill,
  };
};

export const useNoneAgentSkill = () => {
  const {
    store: { useAgentAreaStore },
  } = useAbilityAreaContext();

  const noneAgentSkill = useAgentAreaStore(
    useShallow(state =>
      state.registeredAgentSkillKeyList.every(
        agentSkillKey => !state.hasAgentSkillKeyList.includes(agentSkillKey),
      ),
    ),
  );

  return noneAgentSkill;
};
