import { Suspense, lazy } from 'react';

import { type SetterExtension } from '@flowgram-adapter/free-layout-editor';

import { useInputVariables } from '@/hooks';

const CanvasLazy = lazy(async () => {
  const { Canvas: CanvasNode } = await import('./components/canvas');
  return {
    default: CanvasNode,
  };
});

const Canvas = props => {
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
};

/**
 *  Imageflow's canvas editing node, implemented based on fabric
 */
export const canvas: SetterExtension = {
  key: 'canvas',
  component: Canvas,
};
