import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useBotSkillStore } from '../../../src/store/bot-skill';
import {
  saveFetcher,
  updateBotRequest,
} from '../../../src/save-manager/utils/save-fetcher';
import { ItemTypeExtra } from '../../../src/save-manager/types';
import { saveTimeCapsule } from '../../../src/save-manager/manual-save/time-capsule';

// simulated dependency
vi.mock('../../../src/store/bot-skill', () => ({
  useBotSkillStore: {
    getState: vi.fn(),
  },
}));

vi.mock('../../../src/save-manager/utils/save-fetcher', () => ({
  saveFetcher: vi.fn(),
  updateBotRequest: vi.fn(),
}));

describe('time-capsule save manager', () => {
  const mockTimeCapsule = {
    time_capsule_mode: 'enabled',
    disable_prompt_calling: false,
  };

  const mockTransformedTimeCapsule = {
    enabled: true,
    tags: ['tag1', 'tag2'],
  };

  const mockTransformVo2Dto = {
    timeCapsule: vi.fn(() => mockTransformedTimeCapsule),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Set default state
    (useBotSkillStore.getState as any).mockReturnValue({
      timeCapsule: mockTimeCapsule,
      transformVo2Dto: mockTransformVo2Dto,
    });

    (updateBotRequest as any).mockResolvedValue({
      data: { success: true },
    });

    (saveFetcher as any).mockImplementation(async (fn, itemType) => {
      await fn();
      return { success: true };
    });
  });

  it('应该正确保存 time capsule 配置', async () => {
    await saveTimeCapsule();

    // Verify that transformVo2To.timeCapsule is called, the argument should be an object containing time_capsule_mode and disable_prompt_calling
    expect(mockTransformVo2Dto.timeCapsule).toHaveBeenCalledWith({
      time_capsule_mode: mockTimeCapsule.time_capsule_mode,
      disable_prompt_calling: mockTimeCapsule.disable_prompt_calling,
    });
    // Verify that updateBotRequest was called and the parameters are correct
    expect(updateBotRequest).toHaveBeenCalledWith({
      bot_tag_info: mockTransformedTimeCapsule,
    });

    //  Verify that saveFetcher is called and the parameters are correct
    expect(saveFetcher).toHaveBeenCalledWith(
      expect.any(Function),
      ItemTypeExtra.TimeCapsule,
    );
  });

  it('应该处理 saveFetcher 抛出的错误', async () => {
    const mockError = new Error('Save failed');
    (saveFetcher as any).mockRejectedValue(mockError);

    await expect(saveTimeCapsule()).rejects.toThrow(mockError);
  });
});
