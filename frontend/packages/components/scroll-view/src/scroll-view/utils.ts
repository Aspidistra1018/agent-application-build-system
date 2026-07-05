/**
 * From: https://stackoverflow.com/questions/4900436/how-to-detect-the-installed-chrome-version
 */
export const getChromeVersion = () => {
  const pieces = navigator.userAgent.match(
    /Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/,
  );
  const MAX_LENGTH = 5;
  if (pieces === null || pieces.length !== MAX_LENGTH) {
    return undefined;
  }

  const [, major, minor, build, patch] = pieces.map(piece =>
    parseInt(piece, 10),
  );
  return {
    major,
    minor,
    build,
    patch,
  };
};

/**
 * Whether to support scrollTop with negative numbers in column-reverse mode, chromium minimum supported version 83.0.4086 (previous version was 82.0.4082)
 */
export const supportNegativeScrollTop = () => {
  const chromeVersion = getChromeVersion();

  if (!chromeVersion) {
    /** Suppose all non-chromium browsers support it */
    return true;
  }

  const { major } = chromeVersion;

  const MAX_MAJOR = 83;
  return major >= MAX_MAJOR;
};
