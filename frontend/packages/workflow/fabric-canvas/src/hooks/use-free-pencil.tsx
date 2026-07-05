import { useEffect } from 'react';

import { PencilBrush, type Canvas } from 'fabric';

import { createControls } from '../utils/create-controls';
import { defaultProps, createCommonObjectOptions } from '../utils';
import { Mode } from '../typings';

export const useFreePencil = ({ canvas }: { canvas?: Canvas }) => {
  const enterFreePencil = () => {
    if (!canvas) {
      return;
    }
    // Enable free drawing mode
    canvas.isDrawingMode = true;

    // Set PencilBrush to the current brush
    canvas.freeDrawingBrush = new PencilBrush(canvas);

    // Set some properties of the brush
    canvas.freeDrawingBrush.color = defaultProps[Mode.PENCIL].stroke as string; // Brush color
    canvas.freeDrawingBrush.width = defaultProps[Mode.PENCIL]
      .strokeWidth as number; // Brush Width

    // You can also set other properties, such as opacity.
    // canvas.freeDrawingBrush.opacity = 0.6;
  };

  useEffect(() => {
    if (!canvas) {
      return;
    }
    const disposer = canvas.on('path:created', function (event) {
      const { path } = event;
      const commonOptions = createCommonObjectOptions(Mode.PENCIL);
      path.set({ ...commonOptions, ...defaultProps[Mode.PENCIL] });

      createControls[Mode.PENCIL]?.({
        element: path,
      });

      // You must fire object: added once to trigger onSave, otherwise the schema will not contain commonOptions.
      canvas.fire('object:modified');
    });

    return () => {
      disposer();
    };
  }, [canvas]);

  const exitFreePencil = () => {
    if (!canvas) {
      return;
    }
    // Disable free drawing mode
    canvas.isDrawingMode = false;
  };

  return {
    enterFreePencil,
    exitFreePencil,
  };
};
