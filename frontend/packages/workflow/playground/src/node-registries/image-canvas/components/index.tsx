import { Suspense, lazy } from 'react';

import { useInputVariables } from '@/hooks';
import { withField } from '@/form';

const CanvasLazy = lazy(async () => {
  const { Canvas: CanvasNode } = await import('./canvas/components/canvas');
  return {
    default: CanvasNode,
  };
});

export const Canvas = withField(props => {
  /**
   * useInputVariables internally uses useContext
   * lazyLoad will cause context changes that cannot be monitored
   * Get the variables in advance
   */
  const variables = useInputVariables({
    needNullType: true,
    needNullName: true,
  });

  return (
    <Suspense fallback={<div>canvas loading...</div>}>
      <CanvasLazy {...props} variables={variables} />
    </Suspense>
  );
});
