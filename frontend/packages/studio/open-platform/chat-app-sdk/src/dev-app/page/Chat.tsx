import { type FC } from 'react';

import { nanoid } from 'nanoid';
import { OpenApiSource } from '@coze-studio/open-chat/types';
import { WebSdkChat } from '@coze-studio/open-chat';

const uid = nanoid();

const botConfig = {
  user: uid,
  conversation_id: uid,
  bot_id: process.env.CHAT_APP_INDEX_COZE_BOT_ID || '',
  source: OpenApiSource.WebSdk,
};

const TestChatDemo: FC = () => (
  <WebSdkChat
    title="客服小助手"
    chatConfig={botConfig}
    className="absolute top-[50px]"
    useInIframe={false}
    style={{
      position: 'absolute',
      left: 50,
      top: 50,
      width: 460,
      height: 700,
    }}
  />
);

export default TestChatDemo;
