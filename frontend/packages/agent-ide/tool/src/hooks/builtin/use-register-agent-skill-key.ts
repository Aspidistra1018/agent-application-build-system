import { type AgentSkillKey } from '@coze-agent-ide/tool-config';

import { useAbilityAreaContext } from '../../context/ability-area-context';

/**
 * For internal registration AgentSkill use
 */
export const useRegisterAgentSkillKey = () => {
  const {
    store: { useAgentAreaStore },
  } = useAbilityAreaContext();

  const appendRegisteredAgentSkillKeyList = useAgentAreaStore(
    state => state.appendRegisteredAgentSkillKeyList,
  );

  return (agentSkillKey: AgentSkillKey) => {
    appendRegisteredAgentSkillKeyList(agentSkillKey);
  };
};
