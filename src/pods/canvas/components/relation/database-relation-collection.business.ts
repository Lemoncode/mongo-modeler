import { TABLE_CONST, TableVm } from '@/core/providers';

// Overloaded function for backward compatibility with tests
export function isOverLapping(
  fromTableXCoord: number,
  toTableXCoord: number
): boolean;
export function isOverLapping(fromTable: TableVm, toTable: TableVm): boolean;
export function isOverLapping(
  fromTableOrX: TableVm | number,
  toTableOrX: TableVm | number
): boolean {
  if (typeof fromTableOrX === 'number' && typeof toTableOrX === 'number') {
    // Legacy behavior for tests - use default width
    return (
      fromTableOrX + TABLE_CONST.DEFAULT_TABLE_WIDTH > toTableOrX &&
      fromTableOrX < toTableOrX + TABLE_CONST.DEFAULT_TABLE_WIDTH
    );
  } else {
    // New behavior - use actual table widths
    const fromTable = fromTableOrX as TableVm;
    const toTable = toTableOrX as TableVm;
    const fromTableWidth = fromTable.width ?? TABLE_CONST.DEFAULT_TABLE_WIDTH;
    const toTableWidth = toTable.width ?? TABLE_CONST.DEFAULT_TABLE_WIDTH;

    return (
      fromTable.x + fromTableWidth > toTable.x &&
      fromTable.x < toTable.x + toTableWidth
    );
  }
}
