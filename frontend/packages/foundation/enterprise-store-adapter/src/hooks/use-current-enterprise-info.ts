/**
 * The @file open-source version does not provide enterprise management functions for the time being. The methods exported in this file are for future expansion.
 */
import { type GetEnterpriseResponseData } from '@coze-arch/bot-api/pat_permission_api';

import { useEnterpriseStore } from '../stores/enterprise';

export interface CurrentEnterpriseInfoProps extends GetEnterpriseResponseData {
  organization_id: string | undefined;
}
/**
 * Acquire current corporate information.
 * If the current enterprise is a personal edition, null is returned.
 * Otherwise, return current enterprise information, including enterprise information and organization ID.
 * @example
 * const { organization_id, enterprise_id } = useCurrentEnterpriseInfo();
 * @Returns { (GetEnterpriseResponseData & {organization_id: string | undefined}) | null} current enterprise information or null
 */
export const useCurrentEnterpriseInfo: () => CurrentEnterpriseInfoProps | null =
  () => null;

/**
 * Obtain the current enterprise ID.
 * If the current enterprise type is Personal Edition, the agreed string is returned.
 * Otherwise, return the ID of the current enterprise.
 * @Returns {string} current enterprise ID
 */
export const useCurrentEnterpriseId = () =>
  useEnterpriseStore(store => store.enterpriseId);

/**
 * Check whether the current enterprise is a personal version.
 * @Returns {boolean} True if the current enterprise is a personal edition, false otherwise.
 */
export const useIsCurrentPersonalEnterprise = () => true;

/**
 * Get a list of roles for the current enterprise.
 * If the current enterprise type is Personal, an empty array is returned.
 * Otherwise, a list of the current enterprise's role types is returned, or an empty array if the list does not exist.
 * @Returns {Array} list of roles for the current enterprise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCurrentEnterpriseRoles = (): any[] => [];

/** Is it the enterprise version? */
export const useIsEnterpriseLevel = () => false;

/** Is it the team version? */
export const useIsTeamLevel = () => false;

export const useIsCurrentEnterpriseInit = () =>
  useEnterpriseStore(store => store.isCurrentEnterpriseInit);
