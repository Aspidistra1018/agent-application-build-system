import { UserLevel, type MemberVersionRights } from '../types';

interface UseBenefitBasicResult {
  name: string; // Current user package name
  level: UserLevel; // Current Workspace: User's plan level
  compareLevel: UserLevel; // Current workspace: If it is a professional version, the value is UserLevel. ProPersonal, and other scenes are at the same level.
  currPlan: MemberVersionRights; // Current package information
  nextPlan: MemberVersionRights; // Next package information. If it is already the highest package level, the value is the highest package level.
  accountPlan: MemberVersionRights; // Package information in the account dimension
  instanceStatus: unknown; // The current package status can be used to determine the unsubscribe/expiration status.
  isOverdue: boolean; // Is it in arrears?
  isExpired: boolean; // Whether it has expired
  isTerminated: boolean; // Whether to unsubscribe
  maxMember: number; //maximum membership
}

const defaultData = {
  name: '',
  level: UserLevel.Free,
  compareLevel: UserLevel.Free,
  currPlan: {},
  nextPlan: {},
  accountPlan: {},
  instanceStatus: 1,
  isOverdue: false,
  isExpired: false,
  isTerminated: false,
  maxMember: -1,
};
/**
 * Acquire basic information on domestic rights and interests
 */
export function useBenefitBasic(): UseBenefitBasicResult {
  return defaultData;
}
