import pkg from '../package.json';

type AssetsType = 'cmaps' | 'pdf.worker';

// Here you need to write the version that bnpm has released.
//
const DEFAULT_VERSION = '0.1.0-alpha.x6e892414ec';

/**
 * This method is used to produce the worker & cmaps link of the unpkg environment. Note that it is not a native method of pdfjs
 */
export const generatePdfAssetsUrl = (assets: AssetsType) => {
  const { name } = pkg;
  let assetsUrl;
  switch (assets) {
    case 'cmaps': {
      assetsUrl = 'lib/cmaps/';
      break;
    }
    case 'pdf.worker': {
      assetsUrl = 'lib/worker.js';
      break;
    }
    default: {
      throw new Error(
      );
    }
  }
  const onlinePkgName = name.replace(/^@/, '');

  const domain =
    REGION === 'cn'
      ? 'lf-cdn.coze.cn/obj/unpkg'
      : 'sf-cdn.coze.com/obj/unpkg-va';

  // cp-disable-next-line
  return `//${domain}/${onlinePkgName}/${DEFAULT_VERSION}/${assetsUrl}`;
};
