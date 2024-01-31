import { FieldVm, TableVm, TABLE_CONST } from '@/core/providers';

export const getMaxPositionXFromTables = (tables: TableVm[]): number => {
  if (tables.length === 0) return 0;
  return [...tables].sort((tableA, tableB) => tableB.x - tableA.x)[0].x;
};

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

export const getMaxPositionYFromTables = (tables: TableVm[]): number => {
  if (tables.length === 0) return 0;

  return [...tables]
    .map(table => calculateTableEndYPosition(table))
    .sort((yA, yB) => yB - yA)[0];
};
