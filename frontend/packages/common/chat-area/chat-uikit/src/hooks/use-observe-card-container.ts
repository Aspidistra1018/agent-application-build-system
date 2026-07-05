import { useEffect, type RefObject } from 'react';

import { useDebounceFn } from 'ahooks';
import {
  UIKitEvents,
  useUiKitEventCenter,
} from '@coze-common/chat-uikit-shared';

export const useObserveCardContainer = ({
  messageId,
  cardContainerRef,
  onResize,
}: {
  messageId: string | null;
  cardContainerRef: RefObject<HTMLDivElement>;
  onResize: () => void;
}) => {
  const eventCenter = useUiKitEventCenter();

  /** If there is no change within 30s, the observer will be automatically cleared. */
  const debouncedDisconnect = useDebounceFn(
    (getResizeObserver: () => ResizeObserver | null) => {
      const resizeObserver = getResizeObserver();
      resizeObserver?.disconnect();
    },
    {
      wait: 30000,
    },
  );

  useEffect(() => {
    if (!eventCenter) {
      return;
    }

    let resizeObserver: ResizeObserver | null = null;

    const onAfterCardRender = ({
      messageId: renderCardMessageId,
    }: {
      messageId: string;
    }) => {
      if (!cardContainerRef.current) {
        return;
      }

      if (renderCardMessageId !== messageId) {
        return;
      }

      resizeObserver = new ResizeObserver(() => {
        debouncedDisconnect.run(() => resizeObserver);
        onResize();
      });

      resizeObserver.observe(cardContainerRef.current);
    };

    eventCenter.on(UIKitEvents.AFTER_CARD_RENDER, onAfterCardRender);

    return () => {
      eventCenter.off(UIKitEvents.AFTER_CARD_RENDER, onAfterCardRender);
      resizeObserver?.disconnect();
    };
  }, []);
};
