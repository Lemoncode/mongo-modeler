import { Coords, GUID, Size } from '@/core/model';
import { DatabaseSchemaVm, FieldVm, TableVm } from './canvas.vm';
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

export interface XRelationCoords {
  xOrigin: number;
  xDestination: number;
}

export const calculateRelationXCoordinate = (
  tableOrigin: TableVm,
  tableDestination: TableVm
): XRelationCoords => ({
  xOrigin: calculateRelationXCoordinateOrigin(tableOrigin, tableDestination),
  xDestination: calculateRelationXCoordinateEnd(tableOrigin, tableDestination),
});

export interface SeekResult {
  found: boolean;
  parentCollapsed: boolean;
  YPosition: number;
}
const seekField = (
  fieldId: GUID,
  seekResult: SeekResult,
  fields: FieldVm[]
): SeekResult => {
  const { found, parentCollapsed } = seekResult;
  let { YPosition } = seekResult;
  // let newYPosition = YPosition;
  // let newParentCollapsed = false;
  // let newFound = found;

  const currentLevelParentCollapsed = parentCollapsed;
  let childParentCollapsed = false;

  for (let i = 0; i < fields.length && !found; i++) {
    const field = fields[i];

    if (field.id === fieldId) {
      return { YPosition, parentCollapsed, found: true };
    } else {
      if (!currentLevelParentCollapsed) {
        // seekResult = {
        //   ...seekResult,
        //   YPosition: seekResult.YPosition + ROW_HEIGHT,
        // };
        YPosition = YPosition + ROW_HEIGHT;
      }

      if (!currentLevelParentCollapsed && field.isCollapsed) {
        childParentCollapsed = true;
      }

      if (
        field.type === 'object' &&
        field.children &&
        field.children.length > 0
      ) {
        seekResult = seekField(
          fieldId,
          { found, YPosition, parentCollapsed: childParentCollapsed },
          field.children
        );
        // if (!seekResult.found) {
        //   console.log('recambio');
        //   seekResult.parentCollapsed = true;
        // }

        if (seekResult.found) {
          return {
            YPosition: seekResult.YPosition,
            parentCollapsed: seekResult.parentCollapsed,
            found: true,
          };
        }
      }
    }
  }

  return seekResult;
};

export const calculateRelationYOffset = (
  fieldId: GUID,
  table: TableVm
): number => {
  const initialYPosition = table.y + HEADER_HEIGHT;
  const result = seekField(
    fieldId,
    { found: false, parentCollapsed: false, YPosition: initialYPosition },
    table.fields
  );
  const center = result.YPosition + ROW_HEIGHT / 2;

  return center;
};

const fieldId: GUID = '9';
const table: TableVm = {
  id: '1',
  fields: [
    {
      id: '1',
      name: 'field1',
      type: 'string',
    },
    {
      id: '2',
      name: 'field2',
      type: 'object',
      isCollapsed: false,
      children: [
        {
          id: '4',
          name: 'childField1',
          type: 'number',
        },
        {
          id: '5',
          name: 'collapsibleField1',
          type: 'object',
          isCollapsed: true,
          children: [
            {
              id: '7',
              name: 'subField1',
              type: 'number',
            },
            {
              id: '8',
              name: 'subField2',
              type: 'number',
            },
          ],
        },
        {
          id: '6',
          name: 'collapsibleField2',
          type: 'object',
          isCollapsed: true,
          children: [
            {
              id: '9',
              name: 'subField1',
              type: 'number',
            },
            {
              id: '10',
              name: 'subField2',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
  tableName: 'table1',
  x: 0,
  y: 0,
};
console.log(calculateRelationYOffset(fieldId, table));
export interface YRelationCoords {
  yOrigin: number;
  yDestination: number;
}

export const calculateRelationYCoordinate = (
  fieldIdORigin: GUID,
  fieldIdDestination: GUID,
  tableOrigin: TableVm,
  tableDestination: TableVm
): YRelationCoords => ({
  yOrigin: calculateRelationYOffset(fieldIdORigin, tableOrigin),
  yDestination: calculateRelationYOffset(fieldIdDestination, tableDestination),
});
