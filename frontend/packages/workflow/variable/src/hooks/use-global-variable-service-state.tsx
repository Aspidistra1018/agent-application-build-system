import { useEffect, useMemo } from 'react';

import { useRefresh, useService } from '@flowgram-adapter/free-layout-editor';
import { DisposableCollection } from '@flowgram-adapter/common';

import {
  GlobalVariableService,
  type State as GlobalVariableServiceState,
} from '../services/global-variable-service';

interface Params {
  // Whether to listen for variable load completion events (variable drill-down may change)
  listenVariableLoaded?: boolean;
}

export function useGlobalVariableServiceState(
  params: Params = {},
): GlobalVariableServiceState {
  const { listenVariableLoaded } = params;

  const globalVariableService = useService<GlobalVariableService>(
    GlobalVariableService,
  );

  const refresh = useRefresh();

  useEffect(() => {
    const toDispose = new DisposableCollection();

    toDispose.push(
      globalVariableService.onBeforeLoad(() => {
        refresh();
      }),
    );

    if (listenVariableLoaded) {
      toDispose.push(
        globalVariableService.onLoaded(() => {
          refresh();
        }),
      );
    }

    return () => toDispose.dispose();
  }, []);

  return useMemo(
    () => globalVariableService.state,
    [globalVariableService.state],
  );
}
