import { FieldVm, TableVm, TABLE_CONST } from '@/core/providers';
import { doTablesOverlap } from './export-coordinate.helpers';

export const getMaxPositionXFromTables = (tables: TableVm[]): number =>
  tables.length === 0 ? 0 : Math.max(...tables.map(table => table.x));

export const getFieldsCount = (fields: FieldVm[]): number =>
  fields.reduce((acc, field) => {
    if (field.children && field.children.length > 0 && !field.isCollapsed) {
      return acc + 1 + getFieldsCount(field.children);
    }

    return acc + 1;
  }, 0);

export const calculateTableHeight = (fields: FieldVm[]): number => {
  const countFieldInTable = getFieldsCount(fields);
  const rowHeightTotal = countFieldInTable * TABLE_CONST.ROW_HEIGHT;
  const headerHeight = TABLE_CONST.HEADER_HEIGHT;
  const headerTitleGap = TABLE_CONST.HEADER_TITLE_GAP;
  const bottomPadding = TABLE_CONST.ROW_PADDING;

  return rowHeightTotal + headerHeight + headerTitleGap + bottomPadding;
};

export const calculateTableEndYPosition = (table: TableVm): number => {
  const tableHeight = calculateTableHeight(table.fields);

  return table.y + tableHeight;
};

export const doesTableOverlap = (
  tableA: TableVm,
  tables: TableVm[]
): boolean => {
  if (tables.length === 0) {
    return false;
  }

  const tablesMinusOriginTableCollection = tables.filter(
    t => t.id !== tableA.id
  );

  return tablesMinusOriginTableCollection.some(tableB =>
    doTablesOverlap(tableA, tableB)
  );
};

export const placeTableWithoutOverlap = (
  table: TableVm,
  tables: TableVm[]
): TableVm => {
  let newTable = table;
  let attempts = 0;

  while (
    doesTableOverlap(newTable, tables) &&
    attempts < TABLE_CONST.MAX_PLACEMENT_ATTEMPTS
  ) {
    newTable = {
      ...newTable,
      x: newTable.x - TABLE_CONST.TABLE_SHIFT_DISTANCE,
    };

    if (newTable.x < 0) {
      newTable = {
        ...newTable,
        x: 0,
        y: newTable.y + TABLE_CONST.TABLE_SHIFT_DISTANCE,
      };
    }

    attempts++;
  }

  return newTable;
};

export const placeAllTablesWithoutOverlap = (tables: TableVm[]): TableVm[] => {
  let placedTables: TableVm[] = [];

  for (let table of tables) {
    let newTable = placeTableWithoutOverlap(table, placedTables);
    placedTables.push(newTable);
  }

  return placedTables;
};

export const getMaxPositionYFromTables = (tables: TableVm[]): number =>
  tables.length === 0 ? 0 : Math.max(...tables.map(calculateTableEndYPosition));

export const expandTableFields = (fields: FieldVm[]): FieldVm[] =>
  fields.map(field => ({
    ...field,
    children: field.children ? expandTableFields(field.children) : [],
    isCollapsed: false,
  }));

export const expandAllFieldsInTables = (table: TableVm[]) =>
  table.map(table => ({
    ...table,
    fields: expandTableFields(table.fields),
  }));
