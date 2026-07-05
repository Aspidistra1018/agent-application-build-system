import { useCurrentEntity } from '@flowgram-adapter/free-layout-editor';

import { getTimeoutConfig } from '../utils/get-timeout-config';

/**
 * Get timeout configuration
 * @returns
 */
export const useTimeoutConfig = (): {
  default: number;
  max: number;
  min: number;
  disabled: boolean;
} => {
  const node = useCurrentEntity();
  return getTimeoutConfig(node);
};
