import { type FC, useState } from 'react';

import { nanoid } from 'nanoid';
import { OpenApiSource } from '@coze-studio/open-chat/types';
import { WebSdkChat } from '@coze-studio/open-chat';

const uid = nanoid();

const botConfig = {
  bot_id: process.env.CHAT_APP_INDEX_COZE_BOT_ID || '',
  user: uid,
  conversation_id: uid,
  source: OpenApiSource.WebSdk,
};

const TestAppWidget: FC = () => {
  const [visible] = useState(false);
  // 触发更新
  return (
    <>
      {visible ? (
        <WebSdkChat
          title="客服小助手"
          chatConfig={botConfig}
          style={{ height: 800 }}
          useInIframe={false}
        />
      ) : null}
    </>
  );
};

export default TestAppWidget;
