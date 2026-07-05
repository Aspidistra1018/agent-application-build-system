import { Direction } from '../../types/selection';
import { compareNodePosition } from './compare-node-position';

export const getSelectionDirection = (selection: Selection): Direction => {
  // Make sure there are constituencies
  if (!selection || selection.isCollapsed) {
    return Direction.Unknown; // No constituencies or constituencies not expanded
  }

  const { anchorNode } = selection;
  const { focusNode } = selection;

  // Make sure that neither anchorNode nor focusNode is null
  if (!anchorNode || !focusNode) {
    return Direction.Unknown; // Unable to determine direction
  }

  const { anchorOffset } = selection;
  const { focusOffset } = selection;
  // Compare anchor and focus positions
  if (anchorNode === focusNode) {
    // If the anchor and focus are on the same node, determine the direction by the offset
    return anchorOffset <= focusOffset ? Direction.Forward : Direction.Backward;
  } else {
    // If not in the same node, use Document Position to determine
    const position = compareNodePosition(anchorNode, focusNode);

    if (position === 'before') {
      return Direction.Forward;
    } else if (position === 'after') {
      return Direction.Backward;
    }
  }

  // If the direction cannot be determined, return'unknown'
  return Direction.Unknown;
};
