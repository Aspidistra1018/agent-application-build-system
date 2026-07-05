import { useEffect } from 'react';

import {
  reportTti,
  REPORT_TTI_DEFAULT_SCENE,
} from './utils/custom-perf-metric';

export interface ReportTtiParams {
  isLive: boolean;
  extra?: Record<string, string>;
  scene?: string; // A page only reports tti once by default, and different scenes can be reported multiple times.
}

export const useReportTti = ({
  isLive,
  extra,
  scene = REPORT_TTI_DEFAULT_SCENE,
}: ReportTtiParams) => {
  useEffect(() => {
    if (isLive) {
      // There will be a gap between TODO useEffect and real DOM rendering, you need to consider how to smooth the difference
      // SetTimeout hangs in the background of the page, causing TTI to be severely inaccurate
      reportTti(extra, scene);
    }
  }, [isLive]);
};
