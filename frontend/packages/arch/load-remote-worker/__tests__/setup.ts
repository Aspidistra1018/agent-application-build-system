import { vi } from 'vitest';

// Define a simulated Worker class
class MockWorker {
  constructor(public scriptURL: string, public options: any) {}

  // Methods required to add a Worker interface
  terminate(): void {
    // empty implementation
  }

  postMessage(): void {
    // empty implementation
  }

  onmessage = null;
  onmessageerror = null;
}

// global simulation
global.Worker = MockWorker as any;
global.URL = {
  createObjectURL: vi.fn().mockReturnValue('blob:mocked-object-url'),
} as any;

global.Blob = class MockBlob {
  constructor(public array: any[], public options: any) {}
} as any;

global.location = {
  origin: 'https://example.com',
} as any;
