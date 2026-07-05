function hexToRgb(hex) {
  hex = hex.replace('#', '');

  // Verify hex format
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{8}$/.test(hex)) {
    throw new Error('Invalid hex color format');
  }

  let r,
    g,
    b,
    a = 1;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    a = (parseInt(hex.substring(6, 8), 16) / 255).toFixed(
      2,
    ) as unknown as number;
  }

  return [r, g, b, a];
}

// eslint-disable-next-line max-params
function rgbaToHexWithBackground(r, g, b, a, bgR = 255, bgG = 255, bgB = 255) {
  // Make sure the RGB and Alpha values are within the correct range
  r = Math.min(255, Math.max(0, Math.round(r)));
  g = Math.min(255, Math.max(0, Math.round(g)));
  b = Math.min(255, Math.max(0, Math.round(b)));
  a = Math.min(1, Math.max(0, a));

  // Calculate the new RGB value
  const newR = Math.round(r * a + bgR * (1 - a));
  const newG = Math.round(g * a + bgG * (1 - a));
  const newB = Math.round(b * a + bgB * (1 - a));

  // Convert to hexadecimal and ensure two digits
  const toHex = n => {
    const hex = n.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  // Returns 6 hexadecimal color values
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

export const getBgColor = (mainColor: string, opacity: number) => {
  const themeColor = mainColor || '#5C62FF';

  const [r, g, b] = hexToRgb(themeColor);

  return rgbaToHexWithBackground(r, g, b, opacity);
};
