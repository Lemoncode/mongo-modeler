import { Coords, GUID, Size } from '@/core/model';
import {
  DatabaseSchemaVm,
  FieldVm,
  TableVm,
  RelationVm,
} from './canvas-schema-vlatest.model';
import { TABLE_CONST } from './canvas.const';
import { produce } from 'immer';

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
          TABLE_CONST.HORIZONTAL_LEFT_EXTENSION * 2,
          Math.min(
            updateInfo.position.x,
            canvasSize.width -
              TABLE_CONST.DEFAULT_TABLE_WIDTH -
              TABLE_CONST.HORIZONTAL_LEFT_EXTENSION * 2
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

export const putTableOnTop = (tableId: GUID, tables: TableVm[]): TableVm[] => {
  let result = tables;
  const table = tables.find(table => table.id === tableId);

  if (table) {
    result = [...tables.filter(table => table.id !== tableId), table];
  }

  return result;
};

export const moveTableToTop = (
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
export const calculateRelationXCoordinateOrigin = (
  tableOrigin: TableVm,
  tableDestination: TableVm
): number =>
  tableOrigin.x < tableDestination.x
    ? tableOrigin.x + TABLE_CONST.DEFAULT_TABLE_WIDTH
    : tableOrigin.x;

export const calculateRelationXCoordinateEnd = (
  tableOrigin: TableVm,
  tableDestination: TableVm
): number =>
  tableDestination.x <= tableOrigin.x
    ? tableDestination.x + TABLE_CONST.DEFAULT_TABLE_WIDTH
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

const buildFieldFoundResponse = (
  parentCollapsed: boolean,
  YPosition: number
) => ({
  found: true,
  parentCollapsed,
  YPosition,
});

const doesFieldContainsChildren = (field: FieldVm) =>
  field.type === 'object' && field.children && field.children.length > 0;

const addFieldRowHeight = (
  YPosition: number,
  parentCollapsed: boolean
): number =>
  !parentCollapsed ? YPosition + TABLE_CONST.ROW_HEIGHT : YPosition;

const isParentCollapsedOrCurrentNodeCollapsed = (
  parentCollapsed: boolean,
  field: FieldVm
) => (!parentCollapsed && field.isCollapsed ? true : parentCollapsed);

const seekField = (
  fieldId: GUID,
  seekResult: SeekResult,
  fields: FieldVm[]
): SeekResult => {
  const { found } = seekResult;
  let { YPosition, parentCollapsed } = seekResult;

  for (let i = 0; i < fields.length && !found; i++) {
    const field = fields[i];

    if (field.id === fieldId) {
      return buildFieldFoundResponse(parentCollapsed, YPosition);
    } else {
      YPosition = addFieldRowHeight(YPosition, parentCollapsed);

      parentCollapsed = isParentCollapsedOrCurrentNodeCollapsed(
        parentCollapsed,
        field
      );

      if (doesFieldContainsChildren(field)) {
        const newSeekResult = seekField(
          fieldId,
          { found, parentCollapsed, YPosition },
          field.children || []
        );

        //TODO implement more test and review this code
        //Listen to the older parents
        YPosition = parentCollapsed ? YPosition : newSeekResult.YPosition;

        //Reset to the older parents
        parentCollapsed = found ? newSeekResult.parentCollapsed : false;

        if (newSeekResult.found) {
          return buildFieldFoundResponse(parentCollapsed, YPosition);
        }
      }
    }
  }
  return { found, parentCollapsed, YPosition };
};

export const calculateRelationYOffset = (
  fieldId: GUID,
  table: TableVm
): number => {
  const initialYPosition =
    table.y + TABLE_CONST.HEADER_HEIGHT + TABLE_CONST.HEADER_TITLE_GAP;
  const result = seekField(
    fieldId,
    { found: false, YPosition: initialYPosition, parentCollapsed: false },
    table.fields
  );

  //Need 2px to control text position
  const center = result.YPosition + TABLE_CONST.ROW_HEIGHT / 2 - 2;

  return center;
};

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

export const doFieldToggleCollapseLogic = (
  currentSchema: DatabaseSchemaVm,
  tableId: GUID,
  fieldId: GUID
) =>
  produce(currentSchema, draft => {
    const table = draft.tables.find(t => t.id === tableId);
    if (table) {
      const field = findField(table.fields, fieldId);
      if (field) {
        field.isCollapsed = !field.isCollapsed;
      }
    }
  });

// #90 AddRelation avoid adding a relation that already exists
export const doesRelationAlreadyExists = (
  databaseSchema: DatabaseSchemaVm,
  newRelation: RelationVm
): boolean => {
  return databaseSchema.relations.some(
    relation =>
      relation.fromTableId === newRelation.fromTableId &&
      relation.toTableId === newRelation.toTableId &&
      relation.fromFieldId === newRelation.fromFieldId &&
      relation.toFieldId === newRelation.toFieldId &&
      relation.type === newRelation.type
  );
};

export const deleteItemFromCanvasSchema = (
  currentSchema: DatabaseSchemaVm,
  selectedItemId: GUID
) =>
  produce(currentSchema, draft => {
    draft.tables = draft.tables.filter(t => t.id !== selectedItemId);
    draft.relations = draft.relations.filter(
      r =>
        r.id !== selectedItemId &&
        r.fromTableId !== selectedItemId &&
        r.toTableId !== selectedItemId
    );
    draft.selectedElementId = null;
  });
