import { createContext, useMemo, useContext } from 'react';

import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { type Span } from '@coze-arch/bot-api/workflow_api';

export interface TraceListState {
  spaceId: string;
  workflowId: string;
  isInOp?: boolean;
  /** When opening it for the first time, you need to request the list first, and then select the first item. */
  ready: boolean;
  /** Currently selected span */
  span: Span | null;
}

export interface TraceListAction {
  /** update status */
  patch: (next: Partial<TraceListState>) => void;
}

const createTraceListStore = (
  params: Pick<TraceListState, 'spaceId' | 'workflowId' | 'isInOp'>,
) =>
  createWithEqualityFn<TraceListState & TraceListAction>(
    set => ({
      ...params,
      ready: false,
      span: null,
      patch: next => set(() => next),
    }),
    shallow,
  );

type TraceListStore = ReturnType<typeof createTraceListStore>;

export const TraceListContext = createContext<TraceListStore>(
  {} as unknown as TraceListStore,
);

export const TraceListProvider: React.FC<
  React.PropsWithChildren<
    Pick<TraceListState, 'spaceId' | 'workflowId' | 'isInOp'>
  >
> = ({ spaceId, workflowId, isInOp, children }) => {
  const store = useMemo(
    () => createTraceListStore({ spaceId, workflowId, isInOp }),
    [spaceId, workflowId, isInOp],
  );

  return (
    <TraceListContext.Provider value={store}>
      {children}
    </TraceListContext.Provider>
  );
};

export const useTraceListStore = <T,>(
  selector: (s: TraceListState & TraceListAction) => T,
) => {
  const store = useContext(TraceListContext);

  return store(selector);
};
