/*
 Table cell width adaptation
 ColumnSize. Default should be returned when width is less than WidthThresholds. Small.
 ColumnSize. Small should be returned when width is greater than or equal to WidthThresholds. Small but less than WidthThresholds. Medium.
 ColumnSize. Medium should be returned when width is greater than or equal to WidthThresholds. Medium but less than WidthThresholds. Large.
 ColumnSize. Large should be returned when width is greater than or equal to WidthThresholds. Large.
 'Auto 'should be returned when minWidth is'auto'.
 When minWidth is a specified number, the larger of minWidth and columnWidth should be returned.*/

import { describe, it, expect } from 'vitest';

import {
  responsiveTableColumn,
  ColumnSize,
  WidthThresholds,
} from '../src/responsive-table-column';

describe('responsiveTableColumn', () => {
  it('returns auto for minWidth auto', () => {
    expect(responsiveTableColumn(1000, 'auto')).toBe('auto');
  });

  it('returns minWidth when minWidth is a number and greater than columnWidth', () => {
    expect(responsiveTableColumn(1000, 80)).toBe(80);
  });

  it('returns ColumnSize.Small for width less than WidthThresholds.Small', () => {
    expect(responsiveTableColumn(WidthThresholds.Small - 1, 50)).toBe(
      ColumnSize.Default,
    );
  });

  it('returns ColumnSize.Medium for width between WidthThresholds.Small and WidthThresholds.Medium', () => {
    expect(responsiveTableColumn(WidthThresholds.Medium - 1, 50)).toBe(
      ColumnSize.Small,
    );
  });

  it('returns ColumnSize.Large for width between WidthThresholds.Medium and WidthThresholds.Large', () => {
    expect(responsiveTableColumn(WidthThresholds.Large - 1, 50)).toBe(
      ColumnSize.Medium,
    );
  });

  it('returns ColumnSize.Large for width greater than or equal to WidthThresholds.Large', () => {
    expect(responsiveTableColumn(WidthThresholds.Large, 50)).toBe(
      ColumnSize.Large,
    );
  });
});
