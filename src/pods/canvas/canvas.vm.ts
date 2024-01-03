import { Coords, GUID } from '@/core/model';

export type FieldType = 'number' | 'string' | 'object';

export const GenerateGUID = (): GUID => {
  return crypto.randomUUID();
};

export interface TableVm {
  id: string;
  fields: FieldVm[];
  tableName: string;
  x: number; // Canvas X Position
  y: number; // Canvas Y Position
}

export interface FieldVm {
  id: GUID;
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

export interface Size {
  width: number;
  height: number;
}

export interface UpdateInfo {
  id: GUID;
  position: Coords;
  totalHeight: number;
}

export interface XRelationCoords {
  xOrigin: number;
  xDestination: number;
}
