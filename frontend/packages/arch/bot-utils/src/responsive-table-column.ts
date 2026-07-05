/* eslint-disable no-magic-numbers */
export enum WidthThresholds {
  Small = 1280,
  Medium = 1400,
  Large = 1600,
  Default = 1300,
}

export enum ColumnSize {
  Small = 76,
  Medium = 136,
  Large = 160,
  Default = 80,
}

type MinWidth = 'auto' | number;

interface WidthRange {
  threshold: WidthThresholds;
  columnWidth: ColumnSize;
}

const defaultRange = {
  hreshold: WidthThresholds.Default,
  columnWidth: ColumnSize.Default,
};

const colWidthRanges: WidthRange[] = [
  { threshold: WidthThresholds.Large, columnWidth: ColumnSize.Large },
  { threshold: WidthThresholds.Medium, columnWidth: ColumnSize.Medium },
  { threshold: WidthThresholds.Small, columnWidth: ColumnSize.Small },
];

export const responsiveTableColumn = (
  width: number,
  minWidth: MinWidth = ColumnSize.Medium,
): ColumnSize | string => {
  if (minWidth === 'auto' || typeof minWidth !== 'number') {
    return 'auto';
  }

  // Find the first eligible item
  const range =
    colWidthRanges.find(colWidth => width >= colWidth.threshold) ||
    defaultRange;

  // Return minWidth or found columnWidth, depending on which is larger
  return Math.max(minWidth, range.columnWidth);
};
