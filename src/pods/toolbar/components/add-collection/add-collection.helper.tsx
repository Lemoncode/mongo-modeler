import { Size } from '@/core/model';
import { FieldVm, TABLE_CONST } from '@/core/providers';
import { TABLE_GAP } from './add-collection.model';

export const getFieldsCount = (fields: FieldVm[]): number =>
  fields.reduce((acc, field) => {
    if (field.children && field.children.length > 0 && !field.isCollapsed) {
      return acc + 1 + getFieldsCount(field.children);
    }
    return acc + 1;
  }, 0);

export const getTableSize = (fields: FieldVm[]): Size => {
  const rowHeight = TABLE_CONST.ROW_HEIGHT;
  const headerHeight = TABLE_CONST.HEADER_HEIGHT + TABLE_GAP;
  const headerTitleGap = TABLE_CONST.HEADER_TITLE_GAP;
  const bottomPadding = TABLE_CONST.ROW_PADDING + TABLE_GAP;

  const fieldCount = getFieldsCount(fields);

  const totalHeight =
    headerHeight + headerTitleGap + fieldCount * rowHeight + bottomPadding;
  const totalWidth = TABLE_CONST.DEFAULT_TABLE_WIDTH + TABLE_GAP * 2;

  return {
    width: totalWidth,
    height: totalHeight,
  };
};
