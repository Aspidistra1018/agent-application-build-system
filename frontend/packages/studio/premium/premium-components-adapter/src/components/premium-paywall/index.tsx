export enum PremiumPaywallScene {
  // Create a new space
  AddSpace,
  // New model experience
  NewModel,
  // paid user template
  ProTemplate,
  // Add space member
  AddSpaceMember,
  // collaboration
  Collaborate,
  // Cross-spatial resource replication
  CopyResourceCrossSpace,
  // Publish to API or SDK
  API,
  // Add Timbre Resources
  AddVoice,
  // real-time voice conversation
  RTC,
  // export log
  ExportLog,
  // query log
  FilterLog,
}
export function useBenefitAvailable(_props: unknown) {
  return true;
}
const voidFunc = () => {
  console.log('unImplement void func');
};
export function usePremiumPaywallModal(_props: unknown) {
  return {
    node: <></>,
    open: voidFunc,
    close: voidFunc,
  };
}
