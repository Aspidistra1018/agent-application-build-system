import { useRef } from 'react';

import { type TableData } from '../components/database-table-data/type';

export const useGetTableInstantaneousData = (tableData: TableData) => {
  // Cache data for fetching data in events
  const dataRef = useRef<TableData>(tableData);
  dataRef.current = tableData;

  return () => dataRef.current;
};
