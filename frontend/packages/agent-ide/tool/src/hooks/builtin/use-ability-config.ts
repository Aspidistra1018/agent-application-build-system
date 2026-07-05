import { useAbilityConfigContext } from '../../context/ability-config-context';

/**
 * Users obtain ToolKey usage internally
 */
export const useAbilityConfig = () => {
  const { abilityKey, scope } = useAbilityConfigContext();

  return { abilityKey, scope };
};
