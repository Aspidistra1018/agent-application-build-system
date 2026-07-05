import { GlobalWorkerOptions } from 'pdfjs-dist';

import { generatePdfAssetsUrl } from './generate-assets';

/**
 * This method is used to initialize the workerSrc parameter of pdfjs-dist, which can be called repeatedly
 */
export const initPdfJsWorker = () => {
  if (!GlobalWorkerOptions.workerSrc) {
    GlobalWorkerOptions.workerSrc = generatePdfAssetsUrl('pdf.worker');
  }
};
