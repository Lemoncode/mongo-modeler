import { FieldVm, TableVm, TABLE_CONST } from '@/core/providers';

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

export const isTableOverlap = (table: TableVm, tables: TableVm[]): boolean => {
  if (tables.length === 0) {
    return false;
  }

  const expandedFields = expandTableFields(table.fields);
  const tableEndXPosition = table.x + TABLE_CONST.TABLE_WIDTH;
  const tableEndYPosition = calculateTableEndYPosition({
    ...table,
    fields: expandedFields,
  });

  return tables.some(t => {
    if (t.id === table.id) {
      return false;
    }

    const tExpandedFields = expandTableFields(t.fields);
    const tEndXPosition = t.x + TABLE_CONST.TABLE_WIDTH;
    const tEndYPosition = calculateTableEndYPosition({
      ...t,
      fields: tExpandedFields,
    });

    const overlapInX = table.x <= tEndXPosition && tableEndXPosition >= t.x;
    const overlapInY = table.y <= tEndYPosition && tableEndYPosition >= t.y;

    return overlapInX && overlapInY;
  });
};

export const placeTableWithoutOverlap = (
  table: TableVm,
  tables: TableVm[]
): TableVm => {
  let newTable = table;
  let attempts = 0;

  while (
    isTableOverlap(newTable, tables) &&
    attempts < TABLE_CONST.MAX_PLACEMENT_ATTEMPTS
  ) {
    newTable = {
      ...newTable,
      x: newTable.x - TABLE_CONST.ROW_HEIGHT,
    };

    if (newTable.x < 0) {
      newTable = {
        ...newTable,
        x: 0,
        y: newTable.y + TABLE_CONST.ROW_HEIGHT,
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

const expandTableFields = (fields: FieldVm[]): FieldVm[] =>
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
