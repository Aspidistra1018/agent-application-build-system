export const TestRunService = Symbol('TestRunService');

export interface TestRunService {
  /**
   * Stop practicing running
   */
  pauseTestRun: () => void;
  /**
   * Keep practicing running
   */
  continueTestRun: () => void;
}
