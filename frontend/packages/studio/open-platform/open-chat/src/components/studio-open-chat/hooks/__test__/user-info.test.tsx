import { describe, test, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import { type StudioChatProviderProps } from '@/types/props';
import { OpenApiSource } from '@/types/open';

import { useUserInfo } from '../use-user-info';
import { ChatPropsProvider } from '../../store/context';

vi.hoisted(() => {
  // @ts-expect-error -- 将 IS_OVERSEA 提升到最外层
  global.IS_OVERSEA = false;
});

vi.mock('@/components/conversation-list-sider', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ConversationListSider: () => <div></div>,
}));

describe('user-info', () => {
  const testProps: StudioChatProviderProps = {
    chatConfig: {
      bot_id: 'test',
      source: OpenApiSource.WebSdk,
      conversation_id: 'test',
    },
    userInfo: {
      id: 'test-id',
      nickname: 'test-nickname',
      url: 'test-url',
    },
  };

  test('test props first', () => {
    const { result: userInfo } = renderHook(useUserInfo, {
      wrapper: props => (
        <ChatPropsProvider appProps={testProps}>
          {props.children}
        </ChatPropsProvider>
      ),
    });

    expect(userInfo.current?.nickname).toBe('test-nickname');
  });
});
