import { useContext } from 'react';

import { isValidContext } from '../../utils/is-valid-context';
import { StoreSetContext } from '../../context/store-set';
import { NullableChatAreaContext } from '../../context/chat-area-context/context';

/**
 * For internal use, this must not be exported externally.
 */
export const useChatAreaContext = () => {
  const chatAreaContext = useContext(NullableChatAreaContext);
  const storeSetContext = useContext(StoreSetContext);
  if (!isValidContext(chatAreaContext) || !isValidContext(storeSetContext)) {
    throw new Error('chatAreaContext is not valid');
  }

  return chatAreaContext;
};

/**
 * Only for internal use
 */
export const useChatAreaStoreSet = () => {
  const storeSetContext = useContext(StoreSetContext);
  if (!isValidContext(storeSetContext)) {
    throw new Error('chatAreaContext is not valid');
  }

  return storeSetContext;
};
