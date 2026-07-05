import { useEffect } from 'react';

import {
  AuthType,
  ChatType,
  Language,
  Layout,
} from '@coze-studio/open-chat/types';

import { WebChatClient } from '@/client';

export const TestClientDemo = () => {
  useEffect(() => {
    new WebChatClient({
      config: {
        type: ChatType.BOT,
        appInfo: {
          appId: process.env.CHAT_APP_CHATFLOW_COZE_APP_ID || '',
          workflowId: process.env.CHAT_APP_CHATFLOW_COZE_WORKFLOW_ID || '',
        },

        botInfo: {
          botId: process.env.CHAT_APP_INDEX_COZE_BOT_ID || '',
          parameters: {
            botId: process.env.CHAT_APP_INDEX_COZE_BOT_ID || '',
            botName: '历史学教授',
          },
        },
      },

      auth: {
        type: AuthType.TOKEN,
        token: process.env.CHAT_APP_COZE_TOKEN || '',
        onRefreshToken: () => process.env.CHAT_APP_COZE_TOKEN || '',
      },
      componentProps: {
        title: '历史学教授',
        lang: Language.ZH_CN,
        layout: Layout.PC,
      },
      extra: {
        webChat: {
          test: '123123',
        },
      },
      ui: {
        asstBtn: {
          isNeed: true,
        },
        chatBot: {
          title: '历史学教授33',
          uploadable: true,
          isNeedAudio: true,
          isNeedFunctionCallMessage: true,
          isNeedQuote: true,
          feedback: {
            isNeedFeedback: true,
            feedbackPanel: {
              title:
                '起来不是一个有明确意义的旅游相关问题哦。你可以告诉我关于旅游的具体问题，比如想去的旅游目的地、旅游预算、旅游方',
              tags: [
                {
                  label: '信息不正确',
                },
                {
                  label: '涉及敏感信息',
                  isNeedDetail: true,
                },
              ],
            },
          },
        },
        header: {
          isShow: true,
          isNeedClose: true,
        },
        footer: {
          isShow: true,
          expressionText: ' 由{{name}}提sdd供',
          linkvars: {
            name: {
              text: 'Coze',
              link: 'https://www.coze.com',
            },
          },
        },
        conversations: {
          isNeed: true,
        },
        base: {
          layout: Layout.PC,
          lang: Language.ZH_CN,
        },
      },
      userInfo: {
        id: '12334',
        url: process.env.CHAT_APP_COZE_BOT_USER_URL || '',
        nickname: '3qweqweq4we',
      },
    });
  }, []);
  return <div></div>;
};
