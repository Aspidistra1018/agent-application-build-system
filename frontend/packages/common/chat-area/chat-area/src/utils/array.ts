/**
 * Cut a section of the size of the left and right sides of the center position from the list to reduce the amount of search calculation
 */
export const sliceArrayByIndexRange = <T>(
  array: T[],
  center: number,
  side: number,
) => {
  const start = Math.max(center - side, 0);
  const end = Math.min(center + side, array.length);
  return array.slice(start, end);
};

/**
 * notice: execute mutable change
 */
export const uniquePush = <T extends string | number>(
  arr: T[],
  val: T,
): void => {
  if (arr.includes(val)) {
    return;
  }
  arr.push(val);
};
