/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrop, useDrag } from 'react-dnd';
import React, { useRef, type FC, useEffect } from 'react';

import type { Identifier } from 'dnd-core';
import classNames from 'classnames';

interface SortItemProps {
  /**
   * Type of Drag Element
   */
  type: string;
  /**
   * Order of Drag and Drop Elements
   */
  index: number;
  /**
   * Drag and drop the value of the element
   */
  value: any;
  /**
   * Drag to start callback
   */
  onDragStart?: (startIndex: number) => void;
  /**
   * Drag and drop order to change callbacks
   */
  onDragMove?: (startIndex: number, endIndex: number) => void;
  /**
   * Drag end callback
   */
  onDragEnd?: (startIndex: number, endIndex: number) => void;
  children: FC<{
    dragRef: React.RefObject<HTMLDivElement>;
    isDragging: boolean;
  }>;
}

export const SortableItem = (props: SortItemProps) => {
  const { children, type, onDragStart, onDragMove, onDragEnd, value, index } =
    props;

  const dragRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type,
      item: () => {
        onDragStart?.(index);
        return {
          type,
          startIndex: index,
          index,
          value,
        };
      },
      end: item => {
        onDragEnd?.(item.startIndex, index);
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index, value, onDragStart, onDragEnd],
  );

  const [, drop] = useDrop<
    {
      index: number;
      name: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    void,
    { handlerId: Identifier | null }
  >(
    () => ({
      accept: type,
      hover(item, monitor) {
        if (!dragRef.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        } // If you go back to your own pit, then do nothing
        onDragMove?.(dragIndex, hoverIndex); // Call the incoming method to complete the exchange
        item.index = hoverIndex; // Assign the index of the current move to the box to the currently dragged box, otherwise two boxes will shake wildly!
      },
    }),
    [index, onDragMove],
  );

  drag(dragRef);

  // Hide native drag-and-drop preview styles and implement custom preview styles in custom-drag-layer
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={drop}
      className={classNames({
        ['opacity-0']: isDragging,
        ['opacity-100']: !isDragging,
      })}
    >
      {children({ dragRef, isDragging })}
    </div>
  );
};
