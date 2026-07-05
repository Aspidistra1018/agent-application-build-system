import { useEffect } from 'react';

import { logger } from '@coze-arch/logger';

import { CustomError } from './custom-error';
import { ReportEventNames } from './const';
import { sendCertainError } from './certain-error';

const loggerWithScope = logger.createLoggerWith({
  ctx: {
    namespace: 'bot-global-error',
  },
});

export const useRouteErrorCatch = (error: unknown) => {
  useEffect(() => {
    if (error) {
      // Handling cases that are not instances of error
      const realError =
        error instanceof Error
          ? error
          : new CustomError(
              ReportEventNames.GlobalErrorBoundary,
              `global error route catch error infos:${String(error)}`,
            );
      // Filtering, other errors
      sendCertainError(realError, () => {
        loggerWithScope.persist.error({
          eventName: ReportEventNames.GlobalErrorBoundary,
          message: realError.message || 'global error route catch error',
          error: realError,
          meta: {
            name: realError.name,
            reportJsError: true,
          },
        });
      });
    }
  }, [error]);
};
