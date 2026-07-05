import { useState } from 'react';

import { nanoid } from 'nanoid';
import update from 'immutability-helper';
import { useUpdateEffect } from 'ahooks';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UseSortParams {
  value: Array<any>;
  onChange?: (val: Array<any>) => void;
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
}

export const useSort = (params: UseSortParams) => {
  const { value = [], onChange, onDragStart, onDragMove, onDragEnd } = params;

  // Add dragItemId to value
  const [data, setData] = useState<
    Array<{
      value: any;
      dragItemId: string;
    }>
  >(
    value.map(item => ({
      value: item,
      dragItemId: nanoid(),
    })),
  );

  useUpdateEffect(() => {
    const valueWithDragId = value.map((item, index) => ({
      value: item,
      dragItemId: data[index]?.dragItemId || nanoid(),
    }));

    setData(valueWithDragId);
  }, [value]);

  const [draggingId, setDraggingId] = useState<string | undefined>('');

  // Initialize a unique ID to distinguish between different drag and drop types
  const [dragItemType] = useState(nanoid());

  const isDragging = !!draggingId;

  const handleDragStart = (startIndex: number) => {
    setDraggingId(data[startIndex].dragItemId);

    onDragStart?.(startIndex);
  };

  const handleDragMove = (startIndex: number, endIndex: number) => {
    setData(prevData =>
      update(prevData, {
        $splice: [
          [startIndex, 1],
          [endIndex, 0, prevData[startIndex]],
        ],
      }),
    );

    onDragMove?.(startIndex, endIndex);
  };

  const handleDragEnd = (startIndex: number, endIndex: number) => {
    setDraggingId(undefined);

    if (startIndex !== endIndex) {
      onChange?.(data.map(item => item.value));
    }

    onDragEnd?.(startIndex, endIndex);
  };

  return {
    data,
    isDragging,
    draggingId,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
    dragItemType,
  };
};
