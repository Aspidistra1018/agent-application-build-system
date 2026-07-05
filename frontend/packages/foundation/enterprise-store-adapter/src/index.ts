/**
 * The @file open-source version does not provide enterprise management functions for the time being. The methods exported in this file are for future expansion.
 */

export { PERSONAL_ENTERPRISE_ID } from './constants';
export { useEnterpriseStore } from './stores/enterprise';

export { useEnterpriseList } from './hooks/use-enterprise-list';
export { useCheckEnterpriseExist } from './hooks/use-check-enterprise-exist';
export {
  useCurrentEnterpriseInfo,
  useCurrentEnterpriseId,
  useIsCurrentPersonalEnterprise,
  useCurrentEnterpriseRoles,
  useIsEnterpriseLevel,
  useIsTeamLevel,
  useIsCurrentEnterpriseInit,
  CurrentEnterpriseInfoProps,
} from './hooks/use-current-enterprise-info';

// tool method
export { switchEnterprise } from './utils/switch-enterprise';
export { isPersonalEnterprise } from './utils/personal';
