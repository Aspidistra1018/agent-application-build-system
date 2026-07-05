import { useEffect, useRef } from 'react';

import { MessageBizType } from '@coze-arch/idl/workflow_api';
import type { Disposable } from '@flowgram-adapter/common';

import { useNewDatabaseQuery } from './use-new-database-query';
import { useDependencyService } from './use-dependency-service';
import { useDatabaseNodeService } from './use-database-node-service';
import { useCurrentDatabaseID } from './use-current-database-id';

/**
 * Get the query for the current database
 * @Returns database query results
 *  - data: returns the database object when the query is successful, returns undefined when there is no data
 *  - isLoading: Loading status
 *  - error: the error object when the query fails
 */
export function useCurrentDatabaseQuery() {
  const currentDatabaseID = useCurrentDatabaseID();
  const { data, isLoading, error } = useNewDatabaseQuery(currentDatabaseID);
  const disposeRef: React.MutableRefObject<Disposable | null> =
    useRef<Disposable>(null);
  const databaseNodeService = useDatabaseNodeService();
  const dependencyService = useDependencyService();

  useEffect(() => {
    databaseNodeService.load(currentDatabaseID);
    if (!disposeRef.current) {
      disposeRef.current = dependencyService.onDependencyChange(source => {
        if (source?.bizType === MessageBizType.Database) {
          // When a database resource is updated, rerequest the interface
          databaseNodeService.load(currentDatabaseID);
        }
      });
    }
    return () => {
      disposeRef?.current?.dispose?.();
      disposeRef.current = null;
    };
  }, [currentDatabaseID]);

  return { data, isLoading, error };
}
