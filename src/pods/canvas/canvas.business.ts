import { GUID, Size } from '@/core/model';
import {
  DatabaseSchemaVm,
  FieldVm,
  TableVm,
  UpdateInfo,
  XRelationCoords,
} from './canvas.vm';
import { DEFAULT_TABLE_WIDTH } from './components/table/database-table.const';

export const calculateTablePosition = (
  schema: DatabaseSchemaVm,
  updateInfo: UpdateInfo,
  canvasSize: Size
): DatabaseSchemaVm => ({
  ...schema,
  tables: schema.tables.map(table => {
    if (table.id === updateInfo.id) {
      return {
        ...table,
        //TODO: DEFAULT_TABLE_WIDTH that's the width of the table and we will have to treat this in a separate case
        x: Math.max(
          0,
          Math.min(
            updateInfo.position.x,
            canvasSize.width - DEFAULT_TABLE_WIDTH
          )
        ),
        y: Math.max(
          0,
          Math.min(
            updateInfo.position.y,
            canvasSize.height - updateInfo.totalHeight
          )
        ),
      };
    }
    return table;
  }),
});

export const findField = (fields: FieldVm[], id: GUID): FieldVm | undefined => {
  for (const field of fields) {
    if (field.id === id) return field;
    if (field.children) {
      const found = findField(field.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export const calculateRelationXCoordinateOrigin = (
  tableOrigin: TableVm,
  tableDestination: TableVm
): number =>
  tableOrigin.x < tableDestination.x
    ? tableOrigin.x + DEFAULT_TABLE_WIDTH
    : tableOrigin.x;

export const calculateRelationXCoordinateEnd = (
  tableOrigin: TableVm,
  tableDestination: TableVm
): number =>
  tableDestination.x < tableOrigin.x
    ? tableDestination.x + DEFAULT_TABLE_WIDTH
    : tableDestination.x;

export const calculateRelationXCoordinate = (
  tableOrigin: TableVm,
  tableDestination: TableVm
): XRelationCoords => ({
  xOrigin: calculateRelationXCoordinateOrigin(tableOrigin, tableDestination),
  xDestination: calculateRelationXCoordinateEnd(tableOrigin, tableDestination),
});
