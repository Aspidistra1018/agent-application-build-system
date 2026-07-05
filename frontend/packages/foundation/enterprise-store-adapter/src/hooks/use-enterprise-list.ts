/**
 * The @file open-source version does not provide enterprise management functions for the time being. The methods exported in this file are for future expansion.
 */

import { useEnterpriseStore } from '../stores/enterprise';
/**
 * Hook to get the business list.
 * Get the business list from the business store and return the list of business information.
 * @Returns {Array} Enterprise Information List
 */
export const useEnterpriseList = () => {
  const list = useEnterpriseStore(store => store.enterpriseList);

  return list?.enterprise_info_list ?? [];
};
