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
  isArray?: boolean;
}

export type RelationType = '1:1' | '1:M' | 'M:1';

export interface RelationVm {
  id: GUID;
  fromTableId: string;
  toTableId: string;
  fromFieldId: string;
  toFieldId: string;
  type: RelationType;
}

export type Versions = '0.1';

export interface DatabaseSchemaVm {
  version: Versions;
  tables: TableVm[];
  relations: RelationVm[];
  selectedElementId: GUID | null;
  isExpandAllFields?: boolean;
}

export const createDefaultDatabaseSchemaVm = (): DatabaseSchemaVm => ({
  version: '0.1',
  tables: [],
  relations: [],
  selectedElementId: null,
});

export interface UpdatePositionItemInfo {
  id: string;
  position: Coords;
  totalHeight: number;
  canvasSize: Size;
}

export type UpdatePositionFn = (
  itemInfo: UpdatePositionItemInfo,
  isDragFinished: boolean
) => void;

export interface CanvasSchemaContextVm {
  canvasSchema: DatabaseSchemaVm;
  loadSchema: (schema: DatabaseSchemaVm) => void;
  createEmptySchema: () => void;
  updateTablePosition: UpdatePositionFn;
  doFieldToggleCollapse: (tableId: string, fieldId: GUID) => void;
  updateFullTable: (table: TableVm) => void;
  addTable: (table: TableVm) => void;
  addRelation: (relation: RelationVm) => void;
  doSelectElement: (id: GUID | null) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  doUndo: () => void;
  doRedo: () => void;
  updateFullRelation: (relation: RelationVm) => void;
  deleteSelectedItem: (selectedElementId: GUID) => void;
  updateExpandFields: (isExpanded: boolean) => void;
}
