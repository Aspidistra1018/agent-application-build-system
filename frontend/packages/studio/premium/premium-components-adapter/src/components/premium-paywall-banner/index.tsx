export { useFetchKnowledgeBenefit } from './use-fetch-knowledge-benefit';
export enum PremiumPaywallBannerScene {
  Knowledge, // Knowledge base scenario
  Token, // Token consumption scenarios
}

export function PremiumPaywallBanner(_props: {
  scene: PremiumPaywallBannerScene;
  knowledgeBenefit?: {
    total: number;
    used: number;
  };
  center?: boolean;
}) {
  return <></>;
}
