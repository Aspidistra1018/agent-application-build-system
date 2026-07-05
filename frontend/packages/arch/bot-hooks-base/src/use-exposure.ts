import { useEffect, useRef } from 'react';

import { type BasicTarget } from 'ahooks/lib/utils/domTarget';
import { type Options } from 'ahooks/lib/useInViewport';
import { useInViewport } from 'ahooks';
import { type EVENT_NAMES, sendTeaEvent } from '@coze-arch/bot-tea';

export interface UseExposureParams {
  /** Exposure element */
  target: BasicTarget;
  /** Intersection observer parameters */
  options?: Options;
  /** event name reported */
  eventName?: EVENT_NAMES;
  /** reporting parameters */
  reportParams?: Record<string, unknown>;
  /** Whether to report, the default is true */
  needReport?: boolean;
  isReportOnce?: boolean;
}

/** Exposure event tracking report */
export const useExposure = ({
  target,
  options,
  eventName,
  reportParams,
  needReport = true,
  isReportOnce = false,
}: UseExposureParams) => {
  const [isInView] = useInViewport(target, options);
  const refHasReport = useRef(false);

  useEffect(() => {
    if (isReportOnce && refHasReport.current) {
      //If the data has been reported, please return directly.
      return;
    }
    if (needReport && isInView) {
      sendTeaEvent(eventName, reportParams);
      refHasReport.current = true;
    }
  }, [needReport, isInView, isReportOnce]);
};
