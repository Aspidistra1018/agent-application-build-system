/**
 * Is it under the Webkit kernel browser of the Apple platform?
 * Note: This judgment condition is not equal to under Apple devices, because some Apple devices (such as Mac) can run non-native Webkit engine browsers, such as Chromium (Blink)
 */
export const isAppleWebkit = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof (window as any).webkitConvertPointFromNodeToPage === 'function';
