export interface PostMessage<T = unknown> {
  event: PostMessageEvent;
  chatStoreId: string;
  payload: T;
}

export enum PostMessageEvent {
  ImageClick = 'ImageClick',
}

export interface PostMessageData {
  [PostMessageEvent.ImageClick]: {
    url: string;
  };
}
