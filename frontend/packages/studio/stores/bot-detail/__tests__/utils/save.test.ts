import { describe, it, expect, vi } from 'vitest';
import { PromptType } from '@coze-arch/bot-api/developer_api';

import { getReplacedBotPrompt } from '../../src/utils/save';
import { usePersonaStore } from '../../src/store/persona';

// emulation usePersonaStore
vi.mock('../../src/store/persona', () => ({
  usePersonaStore: {
    getState: vi.fn().mockReturnValue({
      systemMessage: {
        data: '模拟的系统消息',
      },
    }),
  },
}));

describe('save utils', () => {
  describe('getReplacedBotPrompt', () => {
    it('应该返回包含系统消息的提示数组', () => {
      const result = getReplacedBotPrompt();

      expect(result).toHaveLength(3);

      // Verify system message
      expect(result[0]).toEqual({
        prompt_type: PromptType.SYSTEM,
        data: '模拟的系统消息',
      });

      // validate user prefix
      expect(result[1]).toEqual({
        prompt_type: PromptType.USERPREFIX,
        data: '',
      });

      // validate user suffix
      expect(result[2]).toEqual({
        prompt_type: PromptType.USERSUFFIX,
        data: '',
      });
    });

    it('应该从 usePersonaStore 获取系统消息', () => {
      getReplacedBotPrompt();

      expect(usePersonaStore.getState).toHaveBeenCalled();
    });
  });
});
