import { describe, it, expect, vi } from 'vitest';

// Emulate pdfjs-dist module
vi.mock('pdfjs-dist', () => ({
  getDocument: vi.fn(),
}));

// Emulate generate-assets and init-pdfjs-dist modules
vi.mock('../src/generate-assets', () => ({
  generatePdfAssetsUrl: vi.fn(),
}));

vi.mock('../src/init-pdfjs-dist', () => ({
  initPdfJsWorker: vi.fn(),
}));

// Import the tested module
import {
  generatePdfAssetsUrl,
  initPdfJsWorker,
  getDocument,
} from '../src/index';

describe('pdfjs-shadow index', () => {
  it('应该导出所有必要的函数和类型', () => {
    // Validate the derived function
    expect(typeof generatePdfAssetsUrl).toBe('function');
    expect(typeof initPdfJsWorker).toBe('function');

    // Verify functions and types re-exported from pdfjs-dist
    expect(getDocument).toBeDefined();
  });
});
