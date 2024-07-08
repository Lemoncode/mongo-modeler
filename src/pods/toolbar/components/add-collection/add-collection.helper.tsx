import { Size } from '@/core/model';
import { FieldVm, TABLE_CONST } from '@/core/providers';

export const getTableSize = (fields: FieldVm[]): Size => {
  const rowHeight = TABLE_CONST.ROW_HEIGHT;
  const headerHeight = TABLE_CONST.HEADER_HEIGHT;
  const headerTitleGap = TABLE_CONST.HEADER_TITLE_GAP;
  const fieldCount = fields.length;

  const totalHeight =
    headerHeight + headerTitleGap + fieldCount * rowHeight + 10;
  const totalWidth = TABLE_CONST.DEFAULT_TABLE_WIDTH;

  return {
    width: totalWidth,
    height: totalHeight,
  };
};
