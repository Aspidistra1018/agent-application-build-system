const quota = {
  /** The current consumption amount corresponds to the daily refresh in the package. */
  remain: 0,
  total: 0,
  used: 0,
  /** The additional purchase amount is currently only processed in China. */
  extraRemain: 0,
  extraTotal: 0,
  extraUsed: 0,
};
export function usePremiumQuota() {
  return quota;
}
