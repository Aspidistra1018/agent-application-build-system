import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { personaSaveManager } from '../../../src/save-manager/auto-save/persona';
import { modelSaveManager } from '../../../src/save-manager/auto-save/model';
import { autosaveManager } from '../../../src/save-manager/auto-save/index';
import { botSkillSaveManager } from '../../../src/save-manager/auto-save/bot-skill';

// simulated dependency
vi.mock('../../../src/save-manager/auto-save/persona', () => ({
  personaSaveManager: {
    start: vi.fn(),
    close: vi.fn(),
  },
}));

vi.mock('../../../src/save-manager/auto-save/model', () => ({
  modelSaveManager: {
    start: vi.fn(),
    close: vi.fn(),
  },
}));

vi.mock('../../../src/save-manager/auto-save/bot-skill', () => ({
  botSkillSaveManager: {
    start: vi.fn(),
    close: vi.fn(),
  },
}));

describe('autosave manager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Correctly emulate console.log
    vi.spyOn(console, 'log').mockImplementation(() => {
      // Do nothing.
    });
  });

  afterEach(() => {
    // Restore the original console.log
    vi.restoreAllMocks();
  });

  it('应该在启动时调用所有管理器的 start 方法', () => {
    autosaveManager.start();

    // Verify that console.log is called
    expect(console.log).toHaveBeenCalledWith('start:>>');

    // Verify that the start method of all managers is called
    expect(personaSaveManager.start).toHaveBeenCalledTimes(1);
    expect(botSkillSaveManager.start).toHaveBeenCalledTimes(1);
    expect(modelSaveManager.start).toHaveBeenCalledTimes(1);
  });

  it('应该在关闭时调用所有管理器的 close 方法', () => {
    autosaveManager.close();

    // Verify that console.log is called
    expect(console.log).toHaveBeenCalledWith('close:>>');

    // Verify that all managers' close methods are called
    expect(personaSaveManager.close).toHaveBeenCalledTimes(1);
    expect(botSkillSaveManager.close).toHaveBeenCalledTimes(1);
    expect(modelSaveManager.close).toHaveBeenCalledTimes(1);
  });
});
