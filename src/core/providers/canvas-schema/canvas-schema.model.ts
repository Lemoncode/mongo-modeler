import { Coords, FieldType, GUID, Size } from '@/core/model';

export interface TableVm {
  id: string;
  fields: FieldVm[];
  tableName: string;
  x: number; // Canvas X Position
  y: number; // Canvas Y Position
}

export interface FieldVm {
  id: GUID;
  PK: boolean;
  name: string;
  type: FieldType;
  children?: FieldVm[];
  isCollapsed?: boolean;
}

export type RelationType = '1:1' | '1:M' | 'M:1';

export interface RelationVm {
  fromTableId: string;
  toTableId: string;
  fromFieldId: string;
  toFieldId: string;
  type: RelationType;
}

export interface DatabaseSchemaVm {
  tables: TableVm[];
  relations: RelationVm[];
}

export const createDefaultDatabaseSchemaVm = (): DatabaseSchemaVm => ({
  tables: [],
  relations: [],
});

export interface CanvasSchemaContextVm {
  canvasSchema: DatabaseSchemaVm;
  loadSchema: (schema: DatabaseSchemaVm) => void;
  updateTablePosition: (
    id: string,
    position: Coords,
    totalHeight: number,
    canvasSize: Size
  ) => void;
  doFieldToggleCollapse: (tableId: string, fieldId: GUID) => void;
  updateFullTable: (table: TableVm) => void;
  addTable: (table: TableVm) => void;
  addRelation: (relation: RelationVm) => void;
}
