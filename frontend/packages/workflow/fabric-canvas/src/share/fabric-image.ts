/**
 * This file only implements one function setImageFixed
 * Nodejs image rendering also needs to calculate the position. To implement a fully functional js version in packages/workflow/nodejs/fabricate-render
 */
import {
  type FabricImage,
  type FabricObject,
  type Group,
  type Rect,
} from 'fabric';

import { ImageFixedType, type FabricObjectWithCustomProps } from './typings';

/**
 * Adjust img position
 */
export const setImageFixed = ({ element }: { element: FabricObject }) => {
  const { width, height } = element;
  const img = (element as Group).getObjects()[0] as FabricImage;
  const { customFixedType } = img as unknown as FabricObjectWithCustomProps;

  const borderRect = (element as Group).getObjects()[1] as Rect;
  const { strokeWidth = 0 } = borderRect;

  // When filling/stretching, the box fits the group size
  const borderRectWidth = width - strokeWidth;
  const borderRectHeight = height - strokeWidth;
  borderRect.set({
    width: borderRectWidth,
    height: borderRectHeight,
    left: -width / 2,
    top: -height / 2,
  });

  const { width: originWidth, height: originHeight } = img.getOriginalSize();

  /**
   * Why + 1?
   * After calculation, the number of storage bits is limited, whether it is scaleX/Y width/height top/left, a little precision will be lost
   * This accuracy is fed back to the picture, that is, there is a little gap between the picture and the border.
   * Here + 1 makes the image appear slightly larger to make up for the gap in accuracy.
   * Disadvantages: The border will cover a little bit of the picture (how much to cover depends on the zoom ratio), and the user basically has no feeling
   */
  const realScaleX = (width - strokeWidth * 2 + 1) / originWidth;
  const realScaleY = (height - strokeWidth * 2 + 1) / originHeight;
  const minScale = Math.min(realScaleX, realScaleY);
  const maxScale = Math.max(realScaleX, realScaleY);
  let scaleX = minScale;
  let scaleY = minScale;
  if (customFixedType === ImageFixedType.FILL) {
    scaleX = maxScale;
    scaleY = maxScale;
  } else if (customFixedType === ImageFixedType.FULL) {
    scaleX = realScaleX;
    scaleY = realScaleY;
  }

  const imgLeft = -(originWidth * scaleX) / 2;
  const imgTop = -(originHeight * scaleY) / 2;

  // When adapting, you need to stroke the picture
  if (customFixedType === ImageFixedType.AUTO) {
    borderRect.set({
      width: Math.min(borderRectWidth, originWidth * scaleX + strokeWidth),
      height: Math.min(borderRectHeight, originHeight * scaleY + strokeWidth),
      left: Math.max(-width / 2, imgLeft - strokeWidth),
      top: Math.max(-height / 2, imgTop - strokeWidth),
    });
  }

  img.set({
    left: imgLeft,
    top: imgTop,
    width: originWidth,
    height: originHeight,
    scaleX,
    scaleY,
  });
};
