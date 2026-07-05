export const getRangeDirection = (range: Range) => {
  const position = range.compareBoundaryPoints(Range.START_TO_END, range);

  if (position === 0) {
    return 'none'; // The starting and ending points of the selection are the same, i.e. no text is selected
  }

  return position === -1 ? 'backward' : 'forward';
};
