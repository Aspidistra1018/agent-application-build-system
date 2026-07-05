import { createContext } from 'react';

import { type MarkReadService } from '../../service/mark-read';

/**
 * Context provided by a service instance that does not need to be placed in the outermost provider
 */

export interface AfterInitService {
  markReadService?: MarkReadService;
}

export const AfterInitServiceContext = createContext<AfterInitService>({});

export const AfterInitServiceProvider = AfterInitServiceContext.Provider;
