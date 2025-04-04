import { TableVm, TABLE_CONST } from '@/core/providers';
import { getTableSize } from './add-collection.helper';
import { Box } from '@/common/autoarrange-table/autoarrange-table.model';

const tableVMtoBoxVMMapper = (table: TableVm): Box => {
  const tableSize = getTableSize(table.fields);

  return {
    x: table.x,
    y: table.y,
    width: TABLE_CONST.TABLE_WIDTH,
    height: tableSize.height,
  };
};

export const mapTableVMtoBoxVMMapper = (tables: TableVm[]): Box[] =>
  tables.map(tableVMtoBoxVMMapper);
