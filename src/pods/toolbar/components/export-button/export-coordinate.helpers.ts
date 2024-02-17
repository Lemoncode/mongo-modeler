import { TABLE_CONST, TableVm } from '@/core/providers';
import {
  calculateTableEndYPosition,
  expandTableFields,
} from './export-button.business';

const calculateTableEndXCoordinate = (table: TableVm): number =>
  table.x + TABLE_CONST.TABLE_WIDTH;

const calculateTableButtonCoordinate = (table: TableVm): number =>
  calculateTableEndYPosition({
    ...table,
    fields: expandTableFields(table.fields),
  });

const isOverlap = (
  startCoordA: number,
  endCoordA: number,
  startCoordB: number,
  endCoordB: number
): boolean => startCoordA <= endCoordB && endCoordA >= startCoordB;

export const doTablesOverlap = (tableA: TableVm, tableB: TableVm): boolean => {
  const overlapX = isOverlap(
    tableA.x,
    calculateTableEndXCoordinate(tableA),
    tableB.x,
    calculateTableEndXCoordinate(tableB)
  );

  const overlapY = isOverlap(
    tableA.y,
    calculateTableButtonCoordinate(tableA),
    tableB.y,
    calculateTableButtonCoordinate(tableB)
  );

  return overlapX && overlapY;
};
