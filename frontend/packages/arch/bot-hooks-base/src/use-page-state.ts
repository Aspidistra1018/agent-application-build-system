import { useEffect, useRef, useState } from 'react';

export interface PageStateUpdateFunc<State extends object = object> {
  (freshState: State, replace: true): void;
  (freshState: Partial<State>): void;
}

/**
 * A layer of encapsulation of state, including updating state and resetting state
 *
 * @deprecated Please use the useComponentStates of bot-hooks
 */
export function usePageState<State extends object = object>(
  initState: State,
  autoResetWhenDestroy = false,
) {
  const [state, customSetState] = useState(initState);
  const destroyRef = useRef(false);

  function setState(freshState: State, replace: true): void;
  function setState(freshState: Partial<State>): void;
  function setState(freshState: Partial<State> | State, replace?: true) {
    if (replace) {
      customSetState(freshState as State);
    }
    customSetState(prev => ({ ...prev, ...freshState }));
  }

  const resetState = () => {
    customSetState(initState);
  };

  useEffect(() => {
    destroyRef.current = autoResetWhenDestroy;
  }, [autoResetWhenDestroy]);

  useEffect(
    () => () => {
      // Automatic reset status
      if (destroyRef.current) {
        resetState();
      }
    },
    [],
  );

  return {
    state,
    resetState,
    setState: setState as PageStateUpdateFunc<State>,
  };
}
