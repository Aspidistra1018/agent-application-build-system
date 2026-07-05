/* eslint-disable @coze-arch/max-line-per-function */
import { useCallback } from 'react';

import { type FabricObject, type Canvas } from 'fabric';

export const useAlign = ({
  canvas,
  selectObjects = [],
}: {
  canvas?: Canvas;
  selectObjects?: FabricObject[];
}) => {
  // Horizontal left
  const alignLeft = useCallback(() => {
    if (!canvas || selectObjects.length < 2) {
      return;
    }
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      return;
    }

    selectObjects.forEach(obj => {
      obj.set({
        left: -activeObject.width / 2,
      });
      obj.setCoords();
    });
    activeObject.setCoords();

    canvas.fire('object:moving');
    canvas.requestRenderAll();
  }, [canvas, selectObjects]);

  // Horizontal right
  const alignRight = useCallback(() => {
    if (!canvas || selectObjects.length < 2) {
      return;
    }
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      return;
    }
    selectObjects.forEach(obj => {
      obj.set({
        left: activeObject.width / 2 - obj.getBoundingRect().width,
      });
    });
    canvas.fire('object:moving');
    canvas.requestRenderAll();
  }, [canvas, selectObjects]);

  // centered text
  const alignCenter = useCallback(() => {
    if (!canvas || selectObjects.length < 2) {
      return;
    }
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      return;
    }
    selectObjects.forEach(obj => {
      obj.set({
        left: -obj.getBoundingRect().width / 2,
      });
    });
    canvas.fire('object:moving');
    canvas.requestRenderAll();
  }, [canvas, selectObjects]);

  // vertical top
  const alignTop = useCallback(() => {
    if (!canvas || selectObjects.length < 2) {
      return;
    }
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      return;
    }
    selectObjects.forEach(obj => {
      obj.set({
        top: -activeObject.height / 2,
      });
    });
    canvas.fire('object:moving');
    canvas.requestRenderAll();
  }, [canvas, selectObjects]);

  // Vertically centered
  const alignMiddle = useCallback(() => {
    if (!canvas || selectObjects.length < 2) {
      return;
    }
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      return;
    }
    selectObjects.forEach(obj => {
      obj.set({
        top: -obj.getBoundingRect().height / 2,
      });
    });
    canvas.fire('object:moving');
    canvas.requestRenderAll();
  }, [canvas, selectObjects]);

  // vertical
  const alignBottom = useCallback(() => {
    if (!canvas || selectObjects.length < 2) {
      return;
    }
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      return;
    }
    selectObjects.forEach(obj => {
      obj.set({
        top: activeObject.height / 2 - obj.getBoundingRect().height,
      });
    });
    canvas.fire('object:moving');
    canvas.requestRenderAll();
  }, [canvas, selectObjects]);

  // horizontal average fraction
  const verticalAverage = useCallback(() => {
    if (!canvas || selectObjects.length < 2) {
      return;
    }
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      return;
    }

    const totalWidth = selectObjects.reduce(
      (sum, obj) => sum + obj.getBoundingRect().width,
      0,
    );
    const spacing =
      (activeObject.width - totalWidth) / (selectObjects.length - 1);

    let currentLeft = -activeObject.width / 2; // initial position

    selectObjects
      .sort((a, b) => a.getBoundingRect().left - b.getBoundingRect().left)
      .forEach(obj => {
        obj.set({
          left: currentLeft,
        });
        currentLeft += obj.getBoundingRect().width + spacing;
      });
    canvas.fire('object:moving');
    canvas.requestRenderAll();
  }, [canvas, selectObjects]);

  // vertical equipartition
  const horizontalAverage = useCallback(() => {
    if (!canvas || selectObjects.length < 2) {
      return;
    }
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      return;
    }

    const totalHeight = selectObjects.reduce(
      (sum, obj) => sum + obj.getBoundingRect().height,
      0,
    );
    const spacing =
      (activeObject.height - totalHeight) / (selectObjects.length - 1);

    let currentTop = -activeObject.height / 2; // initial position

    selectObjects
      .sort((a, b) => a.getBoundingRect().top - b.getBoundingRect().top)
      .forEach(obj => {
        obj.set({
          top: currentTop,
        });
        currentTop += obj.getBoundingRect().height + spacing;
      });
    canvas.fire('object:moving');
    canvas.requestRenderAll();
  }, [canvas, selectObjects]);

  return {
    alignLeft,
    alignRight,
    alignCenter,
    alignTop,
    alignMiddle,
    alignBottom,
    horizontalAverage,
    verticalAverage,
  };
};
