import { Coords } from '@/core/model';
import { DatabaseSchemaVm, GUID, Size } from './canvas.vm';

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
