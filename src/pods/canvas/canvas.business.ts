import { Coords, GUID, Size } from '@/core/model';
import {
  DatabaseSchemaVm,
  FieldVm,
  TableVm,
  YRelationCoords,
  seekResult,
} from './canvas.vm';
import {
  DEFAULT_TABLE_WIDTH,
  HEADER_HEIGHT,
  ROW_HEIGHT,
} from './components/table/database-table.const';

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

const seekField = (
  fieldId: GUID,
  YPosition: number,
  fields: FieldVm[]
): seekResult => {
  let found = false;
  let parentCollapsed = false;
  let newYPosition = YPosition;

  // TODO we could use a for each here = nop
  for (let i = 0; i < fields.length && !found; i++) {
    const field = fields[i];
    if (field.id === fieldId) {
      found = true;
      // ¿Por qué se devuelve found (siempre va a ser true) y parentCollapsed?
      return {
        found,
        parentCollapsed,
        YPosition: newYPosition,
      };
    } else {
      if (!parentCollapsed) {
        newYPosition += ROW_HEIGHT;
      }

      if (!parentCollapsed && field.isCollapsed) {
        parentCollapsed = true;
      }

      // Si un objeto no tiene hijos, para qué voy a hacer recursividad??
      if (
        field.type === 'object' &&
        field.children &&
        field.children.length > 0
      ) {
        const result = seekField(fieldId, newYPosition, field.children);
        found = result.found;
        newYPosition = parentCollapsed ? newYPosition : result.YPosition;

        parentCollapsed = result.parentCollapsed;
        if (found) {
          return {
            found,
            parentCollapsed,
            YPosition: newYPosition,
          };
        }
      }
    }
  }
  // fields.forEach(field => {
  //   console.log(field.id);
  //   if (field.id === fieldId) {
  //     found = true;
  //     return { found, parentCollapsed, YPosition: newYPosition };
  //   } else {
  //     if (!parentCollapsed) {
  //       newYPosition += ROW_HEIGHT;
  //     }

  //     //esto es lioso
  //     if (!parentCollapsed && field.isCollapsed) {
  //       parentCollapsed = true;
  //     }

  //     if (field.type === 'object') {
  //       const result = seekField(fieldId, newYPosition, field.children ?? []);
  //       found = result.found;
  //       newYPosition = parentCollapsed ? newYPosition : result.YPosition;
  //       parentCollapsed = result.parentCollapsed;
  //       if (found) {
  //         return { found, parentCollapsed, YPosition: newYPosition };
  //       }
  //     }
  //   }
  // });
  return { found, parentCollapsed, YPosition: newYPosition };
};

export const calculateRelationYOffset = (
  fieldId: GUID,
  table: TableVm
): number => {
  const initialYPosition = table.y + HEADER_HEIGHT;
  const result = seekField(fieldId, initialYPosition, table.fields);
  const center = result.YPosition + ROW_HEIGHT / 2;

  return center;
};

export const calculateRelationYCoordinate = (
  fieldIdORigin: GUID,
  fieldIdDestination: GUID,
  tableOrigin: TableVm,
  tableDestination: TableVm
): YRelationCoords => ({
  yOrigin: calculateRelationYOffset(fieldIdORigin, tableOrigin),
  yDestination: calculateRelationYOffset(fieldIdDestination, tableDestination),
});
