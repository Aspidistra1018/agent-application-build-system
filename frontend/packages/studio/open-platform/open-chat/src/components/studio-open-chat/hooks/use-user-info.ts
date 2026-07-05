import { useMemo } from 'react';

import { nanoid } from 'nanoid';
import { type UserSenderInfo } from '@coze-common/chat-area';

import { useChatAppStore } from '../store';
export const useUserInfo = () => {
  const userInfo = useChatAppStore(s => s.userInfo);

  return useMemo<UserSenderInfo | null>(() => {
    const openUserInfo = userInfo;
    if (!openUserInfo) {
      return {
        id: nanoid(),
        nickname: '',
        url: '',
        userUniqueName: '',
        userLabel: null,
      };
    }

    const areaUserInfo: UserSenderInfo = {
      ...openUserInfo,
      userUniqueName: '',
      userLabel: null,
    };

    return areaUserInfo;
  }, [userInfo]);
};
