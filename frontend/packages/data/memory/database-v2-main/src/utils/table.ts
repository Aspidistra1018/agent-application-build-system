import { type ColumnProps } from '@coze-arch/coze-design';

import { type TableRow } from '../components/database-table-data/type';

const FIXED_COLUMN_WIDTH = 60;
const MIN_COLUMN_WIDTH = 100;
/**
 * Callbacks when table columns are scaled to limit the scaling boundaries
 * @param column
 * @returns
 */
export const resizeFn = (
  column: ColumnProps<TableRow>,
): ColumnProps<TableRow> => {
  // The checkbox/serial number column is not retractable
  if (column.key === 'column-selection') {
    return {
      ...column,
      resizable: false,
      width: FIXED_COLUMN_WIDTH,
    };
  }
  // Fixed columns (action columns) are not scalable
  if (column.fixed) {
    return {
      ...column,
      resizable: false,
    };
  }
  // The remaining field columns are scalable, but the minimum width needs to be limited
  return {
    ...column,
    width:
      Number(column.width) < MIN_COLUMN_WIDTH
        ? MIN_COLUMN_WIDTH
        : Number(column.width),
  };
};
