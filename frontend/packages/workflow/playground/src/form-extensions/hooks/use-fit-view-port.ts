/**
 * This hooks is used to handle the scaling of the canvas after the side sheet panel is opened, ensuring that the host node is centered and visible
 */
import { useEffect } from 'react';

import {
  PlaygroundConfigEntity,
  useEntity,
  usePlayground,
  TransformData,
} from '@flowgram-adapter/free-layout-editor';
import { SizeSchema } from '@flowgram-adapter/common';

const SCROLL_TO_VIEW_TIMEOUT = 200;
const BOUNDS_PAD = 30;

/** Reset the canvas scale to the appropriate size for the host node when the side sheet panel is open */
export const useFitViewport = (params: {
  enable?: boolean;
  nodeId?: string;
}) => {
  const { enable, nodeId } = params;
  const playgroundConfig = useEntity<PlaygroundConfigEntity>(
    PlaygroundConfigEntity,
  );
  const playground = usePlayground();

  useEffect(() => {
    if (!enable || !nodeId) {
      return;
    }

    setTimeout(() => {
      const currentNode = playground.entityManager.getEntityById(nodeId);
      if (!currentNode) {
        return;
      }

      const { bounds } = currentNode.getData<TransformData>(TransformData);
      bounds.pad(BOUNDS_PAD, BOUNDS_PAD);
      const viewport = playgroundConfig.getViewport(false);
      const zoom = SizeSchema.fixSize(bounds, viewport);

      playgroundConfig.scrollToView({
        bounds,
        zoom,
        scrollToCenter: true,
      });
    }, SCROLL_TO_VIEW_TIMEOUT);
  }, [enable]);
};
