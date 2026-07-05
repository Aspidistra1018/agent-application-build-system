import Browser from 'bowser';

let getIsMobileCache: boolean | undefined;
/**
 * Is it a mobile device?
 * Note: iPad is not a mobile device
 */
const isMobile = () =>
  Browser.getParser(navigator.userAgent)
    .getPlatformType(true)
    .includes('mobile');

export const getIsMobile = () => {
  if (typeof getIsMobileCache === 'undefined') {
    getIsMobileCache = isMobile();
  }
  return getIsMobileCache;
};

let getIsIPhoneOrIPadCache: boolean | undefined;
/**
 * Code provided by gpt-4
 */
export const getIsIPhoneOrIPad = () => {
  if (typeof getIsIPhoneOrIPadCache === 'undefined') {
    const { userAgent } = navigator;
    const isAppleDevice = /iPad|iPhone|iPod/.test(userAgent);
    const isIPadOS =
      userAgent.includes('Macintosh') &&
      'ontouchstart' in document.documentElement;

    getIsIPhoneOrIPadCache = isAppleDevice || isIPadOS;
  }

  return getIsIPhoneOrIPadCache;
};

let getIsIPadCache: boolean | undefined;
/**
 * Code provided by gpt-4
 */
export const getIsIPad = () => {
  if (typeof getIsIPadCache === 'undefined') {
    const { userAgent } = navigator;
    const isIPadDevice = /iPad/.test(userAgent);
    const isIPadOS =
      userAgent.includes('Macintosh') &&
      'ontouchstart' in document.documentElement;

    getIsIPadCache = isIPadDevice || isIPadOS;
  }

  return getIsIPadCache;
};

export const getIsMobileOrIPad = () => getIsMobile() || getIsIPhoneOrIPad();
