import {
  type PostMessage,
  PostMessageEvent,
} from '@coze-studio/open-chat/types';

export const postMessageUtil = {
  isImageClick(
    msg: PostMessage<Partial<PostMessageData['ImageClick']>>,
  ): msg is PostMessage<PostMessageData['ImageClick']> {
    return msg.event === PostMessageEvent.ImageClick && !!msg?.payload?.url;
  },
};

export interface PostMessageData {
  [PostMessageEvent.ImageClick]: {
    url: string;
  };
}
