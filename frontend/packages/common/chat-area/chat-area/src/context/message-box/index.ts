import { useContext } from 'react';

import { MessageBoxContext } from './context';

export const useMessageBoxContext = () => {
  const { message, messageUniqKey, meta, ...rest } =
    useContext(MessageBoxContext);
  if (!message || !meta) {
    throw new Error(
      `failed to get message or meta by message id or local_id ${messageUniqKey}`,
    );
  }
  return { message, messageUniqKey, meta, ...rest };
};

/**
 * If the context may also appear in scenarios without messageBoxContext, such as onboarding;
 * If the invoked environment is inside a normal message box, use regular useMessageBoxContext
 */
export const useUnsafeMessageBoxContext = () => useContext(MessageBoxContext);
