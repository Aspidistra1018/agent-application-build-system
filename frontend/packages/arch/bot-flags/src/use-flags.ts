import { useState, useEffect } from 'react';

import { featureFlagStorage } from './utils/storage';
import { type FEATURE_FLAGS } from './types';
import { getFlags } from './get-flags';

export const useFlags = (): [FEATURE_FLAGS] => {
  const plainFlags = getFlags();
  // Listens to the fg store event and triggers the react component to respond to changes
  const [, setTick] = useState<number>(0);

  useEffect(() => {
    const cb = () => {
      setTick(Date.now());
    };
    featureFlagStorage.on('change', cb);
    return () => {
      featureFlagStorage.off('change', cb);
    };
  }, []);

  return [plainFlags];
};
