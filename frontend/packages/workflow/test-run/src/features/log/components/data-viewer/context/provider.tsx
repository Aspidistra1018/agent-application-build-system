import React, { useEffect, useMemo } from 'react';

import { type Field } from '../types';
import { createDataViewerStore } from './create-store';
import { DataViewerContext } from './context';

interface DataViewerProviderProps {
  fields: Field[];
}

export const DataViewerProvider: React.FC<
  React.PropsWithChildren<DataViewerProviderProps>
> = ({ children, fields }) => {
  const store = useMemo(() => createDataViewerStore(), []);

  // When the root has only one item and it can be drilled down, it is expanded by default
  useEffect(() => {
    if (
      store.getState().expand === null &&
      fields.length === 1 &&
      fields[0]?.isObj
    ) {
      store.setState({
        [fields[0].path.join('.')]: true,
      });
    }
  }, [fields, store]);

  return (
    <DataViewerContext.Provider value={store}>
      {children}
    </DataViewerContext.Provider>
  );
};
