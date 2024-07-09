import { TableVm, TABLE_CONST } from '@/core/providers';
import { getTableSize } from './add-collection.helper';
import { Box } from '@/common/autoarrange-table/autoarrange-table.model';

const tableVMtoBoxVMMapper = (table: TableVm): Box => {
  const tableSize = getTableSize(table.fields);

  // Adding the table center adjustment so that it only affects the table center
  // when it is added and not to collisions

  return {
    x: table.x + getTableSize(table.fields).width / 2,
    y: table.y + getTableSize(table.fields).height / 2,
    width: TABLE_CONST.TABLE_WIDTH,
    height: tableSize.height,
  };
};

export const mapTableVMtoBoxVMMapper = (tables: TableVm[]): Box[] =>
  tables.map(tableVMtoBoxVMMapper);
