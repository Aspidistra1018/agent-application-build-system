import { type CSSProperties, type HTMLAttributes } from 'react';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

/**
 * Split from packages/data/database-v2/src/components/database-table-data/index.tsx
 * The original implementation was basically copied from the Semi document, and the sorted data was not submitted to the server level. The PM did not seem to know about this function, so...
 * @see
 */
export const SortableRow = (
  // https://github.com/DouyinFE/semi-design/blob/v2.69.2/packages/semi-ui/table/Body/BaseRow.tsx#L396
  // eslint-disable-next-line @typescript-eslint/naming-convention -- semi does not export the type of table row props
  sortProps: HTMLAttributes<HTMLTableRowElement> & { 'data-row-key': string },
) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: sortProps['data-row-key'],
  });
  const style: CSSProperties = {
    ...sortProps.style,
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 1 : undefined,
    position: isDragging ? 'relative' : undefined,
  };

  return (
    <tr
      {...sortProps}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};
