import { FieldType, GUID } from '@/core/model';

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

export const createDefaultTable = (): TableVm => ({
  id: GenerateGUID(),
  tableName: 'New Table',
  fields: [
    {
      id: GenerateGUID(),
      PK: true,
      name: '_id',
      type: 'objectId',
    },
  ],
  x: 0,
  y: 0,
});

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
