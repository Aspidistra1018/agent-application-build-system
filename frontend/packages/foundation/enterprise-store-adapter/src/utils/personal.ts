/**
 * The @file open-source version does not provide enterprise management functions for the time being. The methods exported in this file are for future expansion.
 */

import { PERSONAL_ENTERPRISE_ID } from '../constants';

// Check if the business is a personal version
export const isPersonalEnterprise = (enterpriseId?: string) =>
  enterpriseId === PERSONAL_ENTERPRISE_ID;
