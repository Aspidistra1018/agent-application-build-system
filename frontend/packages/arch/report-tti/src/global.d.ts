/// <reference types='@coze-arch/bot-typings' />

declare interface Window {
  // This global method is injected when running e2e
  REPORT_TTI_FOR_E2E?: (
    timestamp: number,
    performanceEntry: PerformanceEntryList,
  ) => void;
}
