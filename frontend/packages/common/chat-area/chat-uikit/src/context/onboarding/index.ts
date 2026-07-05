import { createContext, useContext } from 'react';

import { type IEventCallbacks } from '@coze-common/chat-uikit-shared';
/**
 * In order to support CozeImage's empty fetching and performance optimization, consider the temporarily opened Context, don't use it indiscriminately...
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const OnboardingContext = createContext<{
  imageAutoSizeContainerWidth: number | undefined;
  eventCallbacks: IEventCallbacks | undefined;
}>({
  imageAutoSizeContainerWidth: undefined,
  eventCallbacks: undefined,
});

export const useOnboardingContext = () => useContext(OnboardingContext);
