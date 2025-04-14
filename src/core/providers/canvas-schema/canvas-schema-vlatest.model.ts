import { Coords, FieldType, GUID, Size } from '@/core/model';
import { errorHandling } from '@/core/model/errorHandling';

export interface TableVm {
  id: string;
  fields: FieldVm[];
  tableName: string;
  x: number; // Canvas X Position
  y: number; // Canvas Y Position
  indexes?: IndexVm[];
}

export interface FieldVm {
  id: GUID;
  PK: boolean;
  name: string;
  type: FieldType;
  children?: FieldVm[];
  isCollapsed?: boolean;
  isArray?: boolean;
  isNN?: boolean;
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
  isPristine?: boolean;
}

export type OrderMethod = 'Ascending' | 'Descending';

export interface IndexField {
  name: string;
  orderMethod: OrderMethod;
}
export interface IndexVm {
  id: string;
  name: string;
  isUnique: boolean;
  sparse: boolean;
  fields: IndexField[];
  fieldsString?: string;
  partialFilterExpression?: string;
}

export const createDefaultDatabaseSchemaVm = (): DatabaseSchemaVm => ({
  version: '0.1',
  tables: [],
  relations: [],
  selectedElementId: null,
  isPristine: true,
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
  setCanvasSchema: (schema: DatabaseSchemaVm) => void;
  loadSchema: (schema: DatabaseSchemaVm) => void;
  createEmptySchema: () => void;
  updateTablePosition: UpdatePositionFn;
  doFieldToggleCollapse: (tableId: string, fieldId: GUID) => void;
  updateFullTable: (table: TableVm) => void;
  updateFullTableByCheckingIndexes: (table: TableVm) => errorHandling;
  addTable: (table: TableVm) => void;
  addRelation: (relation: RelationVm) => void;
  addIndexes: (tableId: GUID, indexes: IndexVm[]) => void;
  doSelectElement: (id: GUID | null) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  doUndo: () => void;
  doRedo: () => void;
  updateFullRelation: (relation: RelationVm) => void;
  deleteSelectedItem: (selectedElementId: GUID) => void;
  switchIsPristine: (isPristine: boolean) => void;
  duplicateSelectedTable: () => void;
  copySelectedTable: () => void;
  pasteTable: () => void;
  hasClipboardContent: boolean;
}
