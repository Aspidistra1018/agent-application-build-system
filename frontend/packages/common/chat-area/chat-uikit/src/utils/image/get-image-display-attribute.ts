export const getImageDisplayAttribute = (
  width: number,
  height: number,
  contentWidth: number,
) => {
  // image scale
  const imageRatio = width / height;

  // display width
  let displayWidth = contentWidth;
  // display height
  let displayHeight = contentWidth / imageRatio;
  // Whether to cut
  let isCover = false;

  // (Small size drawing)

  if (width <= contentWidth && height <= 240) {
    displayWidth = width;
    displayHeight = height;
  } else if (imageRatio > contentWidth / 120) {
    displayWidth = contentWidth;
    displayHeight = 120;
    isCover = true;
    // (Long vertical) Image width: Image height < = 0.5
  } else if (imageRatio <= 0.5) {
    displayWidth = 120;
    displayHeight = 240;
    isCover = true;
    // (Equivalent display picture)
  } else if (0.5 <= imageRatio && imageRatio <= contentWidth / 240) {
    displayWidth = 240 * imageRatio;
    displayHeight = 240;
    // (Medium and long horizontal chart)
  } else if (
    contentWidth / 240 <= imageRatio &&
    imageRatio <= contentWidth / 240
  ) {
    displayWidth = contentWidth;
    displayHeight = contentWidth / imageRatio;
  }

  return {
    displayHeight,
    displayWidth,
    isCover,
  };
};
