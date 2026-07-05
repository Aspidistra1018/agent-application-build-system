import { createContext } from 'react';

import { type ActionController, type ActionSize } from '../types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActionBarContext = createContext<{
  controller: ActionController;
  size: ActionSize;
}>({
  controller: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    hideActionBar: () => {},
    // reposition
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    rePosition: () => {},
  },
  size: 'small',
});
