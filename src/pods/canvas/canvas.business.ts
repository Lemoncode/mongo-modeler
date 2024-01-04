import { Coords, GUID } from '@/core/model';
import { DatabaseSchemaVm, FieldVm, Size, TableVm } from './canvas.vm';

export interface UpdateInfo {
  id: GUID;
  position: Coords;
  totalHeight: number;
}

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
        //TODO: 300 that's the width of the table and we will have to treat this in a separate case
        x: Math.max(0, Math.min(updateInfo.position.x, canvasSize.width - 300)),
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

export const putTableOnTop = (tableId: GUID, tables: TableVm[]): TableVm[] => {
  let result = tables;
  const table = tables.find(table => table.id === tableId);

  if (table) {
    result = [...tables.filter(table => table.id !== tableId), table];
  }

  return result;
};

export const calculateTablePositionPutOnTop = (
  schema: DatabaseSchemaVm,
  updateInfo: UpdateInfo,
  canvasSize: Size
): DatabaseSchemaVm => {
  const updateSchema = calculateTablePosition(schema, updateInfo, canvasSize);
  return {
    ...updateSchema,
    tables: putTableOnTop(updateInfo.id, updateSchema.tables),
  };
};
