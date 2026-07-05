import {
  type SubscriptionBenefitDetail,
  type SKUInfo,
  type SubscriptionUserInfo,
  type SubscriptionDetail,
  type SubscriptionRelateBenefit,
  type MemberVersionRights,
  type SubscriptionDetailV2,
} from '@coze-arch/bot-api/trade';
import { type BindConnection } from '@coze-arch/bot-api/developer_api';

export enum UserLevel {
  /** The free version. */
  Free = 0,
  /** overseas
PremiumLite */
  PremiumLite = 10,
  /** Premium */
  Premium = 15,
  PremiumPlus = 20,
  /** domestic
V1 Volcano Pro */
  V1ProInstance = 100,
  /** Personal flagship version */
  ProPersonal = 110,
  /** Team Edition */
  Team = 120,
  /** Enterprise Edition */
  Enterprise = 130,
}

export type {
  MemberVersionRights,
  SubscriptionDetail,
  BindConnection,
  SubscriptionDetailV2,
  SubscriptionUserInfo,
  SKUInfo,
};
export type PremiumPlan = SKUInfo & {
  benefit_info?: SubscriptionBenefitDetail;
  relate_benefit?: SubscriptionRelateBenefit;
};

export type PremiumSubs = Record<string, SubscriptionUserInfo>;
