import { useScrollViewSize } from '../../context/scroll-view-size';
import { usePreference } from '../../context/preference';

export const useOnboardingCenterOffset = ({
  onboardingHeight = 0,
  // Default minimum margin by ui design Top reserved 24px supported by top-safe-area
  minOffset = 0,
}: {
  onboardingHeight?: number;
  minOffset?: number;
}) => {
  const { isOnboardingCentered } = usePreference();
  const scrollViewSize = useScrollViewSize();
  if (!isOnboardingCentered) {
    return;
  }

  if (!scrollViewSize?.height) {
    return;
  }

  return Math.max((scrollViewSize.height - onboardingHeight) / 2, minOffset);
};
