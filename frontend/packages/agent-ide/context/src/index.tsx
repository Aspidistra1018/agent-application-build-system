import { createContext, useContext } from 'react';

export enum BotCreatorScene {
  Bot = 'bot',
  DouyinBot = 'douyin-bot',
}

const BotCreatorContext = createContext<{ scene: BotCreatorScene | undefined }>(
  {
    scene: BotCreatorScene.Bot,
  },
);

export const BotCreatorProvider = BotCreatorContext.Provider;

export const useBotCreatorContext = () => {
  const context = useContext(BotCreatorContext);

  if (!context) {
    throw new Error(
      'useBotCreatorContext must be used within a BotCreatorProvider',
    );
  }

  return context;
};
