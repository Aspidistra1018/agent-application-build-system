import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Emulate pdfjs-dist module
vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: {
    workerSrc: '',
  },
}));

// Simulate generate-assets module
vi.mock('../src/generate-assets', () => ({
  generatePdfAssetsUrl: vi.fn().mockReturnValue('mocked-worker-url'),
}));

// Import the tested module
import { GlobalWorkerOptions } from 'pdfjs-dist';

import { initPdfJsWorker } from '../src/init-pdfjs-dist';
import { generatePdfAssetsUrl } from '../src/generate-assets';

describe('initPdfJsWorker', () => {
  beforeEach(() => {
    // Reset GlobalWorkerOptions.workerSrc before each test
    GlobalWorkerOptions.workerSrc = '';
    // Clear all call records for simulated functions
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Reset simulation after each test
    vi.resetAllMocks();
  });

  it('应该设置 GlobalWorkerOptions.workerSrc 当它为空时', () => {
    // Make sure workerSrc is initially empty
    expect(GlobalWorkerOptions.workerSrc).toBe('');

    // Invoke initialization function
    initPdfJsWorker();

    // Verify generatePdfAssetsUrl is called and the parameters are correct
    expect(generatePdfAssetsUrl).toHaveBeenCalledTimes(1);
    expect(generatePdfAssetsUrl).toHaveBeenCalledWith('pdf.worker');

    // Verify that workerSrc is set correctly
    expect(GlobalWorkerOptions.workerSrc).toBe('mocked-worker-url');
  });

  it('不应该重新设置 GlobalWorkerOptions.workerSrc 当它已经有值时', () => {
    // Pre-set workerSrc
    GlobalWorkerOptions.workerSrc = 'existing-worker-url';

    // Invoke initialization function
    initPdfJsWorker();

    // Verify generatePdfAssetsUrl not called
    expect(generatePdfAssetsUrl).not.toHaveBeenCalled();

    // Verify that workerSrc remains unchanged
    expect(GlobalWorkerOptions.workerSrc).toBe('existing-worker-url');
  });
});
