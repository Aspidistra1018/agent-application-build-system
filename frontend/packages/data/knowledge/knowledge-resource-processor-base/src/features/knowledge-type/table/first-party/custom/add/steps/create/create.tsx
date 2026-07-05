import { type TableLocalContentProps } from '../../types';
import { TableCustomCreate as TableCustomCreateV2 } from './create-v2';

/** Delete TableCustomCreateV1 at that time.*/
export const TableCustomCreate = (props: TableLocalContentProps) => (
  <TableCustomCreateV2 {...props} />
);
