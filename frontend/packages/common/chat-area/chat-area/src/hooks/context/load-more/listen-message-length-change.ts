import { useEffect, useMemo, useRef } from 'react';

import { useImperativeLayoutEffect } from '@coze-common/chat-hooks';

import { type MessagesStore } from '../../../store/messages';

type Listener = () => void;

const invoke = (fn: () => void) => fn();

class ListenMessageLengthChange {
  private unsubscribe: () => void;
  constructor(useMessagesStore: MessagesStore) {
    this.unsubscribe = useMessagesStore.subscribe(
      state => state.messages.length,
      () => this.fns.forEach(invoke),
    );
  }

  private fns = new Set<Listener>();

  listenMessagesLengthChange(fn: Listener) {
    this.fns.add(fn);
    return {
      dispose: () => {
        this.fns.delete(fn);
      },
    };
  }

  forceDispose = () => {
    this.fns.clear();
    this.unsubscribe();
  };
}

// Todo: review is dick and dangerous ⚡☠️
export const useListenMessagesLengthChangeLayoutEffect = (
  useMessagesStore: MessagesStore,
) => {
  const fnsRef = useRef<Listener[]>([]);
  const trigger = () => {
    fnsRef.current.forEach(invoke);
    fnsRef.current = [];
  };

  const askTrigger = useImperativeLayoutEffect(trigger);
  const listener = useMemo(
    () => new ListenMessageLengthChange(useMessagesStore),
    [],
  );
  useEffect(() => listener.forceDispose, []);
  useEffect(() => {
    const { dispose } = listener.listenMessagesLengthChange(askTrigger);
    return dispose;
  }, []);

  /**
   * It only takes effect once after monitoring
   */
  return (fn: Listener) => fnsRef.current.push(fn);
};
