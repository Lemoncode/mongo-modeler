import { FieldType, GUID } from '@/core/model';

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

export interface DatabaseSchemaVmV0 {
  version: Versions;
  tables: TableVm[];
  relations: RelationVm[];
  selectedElementId: GUID | null;
}
