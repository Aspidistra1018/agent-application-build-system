import { createContext, type RefObject, useContext } from 'react';

export interface PublishContainerContextProps {
  getContainerRef: () => RefObject<HTMLDivElement> | null;
  /** The layout of the distribution channel is influenced by the height of the top header. Use this variable to associate them */
  publishHeaderHeight: number;
  setPublishHeaderHeight: (height: number) => void;
}

export const PublishContainerContext =
  createContext<PublishContainerContextProps>({
    getContainerRef: () => null,
    publishHeaderHeight: 0,
    setPublishHeaderHeight: () => 0,
  });

export const usePublishContainer = () => useContext(PublishContainerContext);
