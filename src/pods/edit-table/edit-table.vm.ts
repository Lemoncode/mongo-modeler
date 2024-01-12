import { FieldType, GUID, GenerateGUID } from '@/core/model';

// EditTableVm is different from canvas FK field
// We will need to create a mapper taking into account
// FKs
export interface FieldVm {
  id: GUID;
  PK: boolean;
  FK: boolean;
  name: string;
  type: FieldType;
  children?: FieldVm[];
  isCollapsed?: boolean;
  isArray?: boolean;
}

export const createDefaultField = (): FieldVm => ({
  id: GenerateGUID(),
  PK: false,
  FK: false,
  name: 'newField',
  type: 'string',
});

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
      FK: false,
      name: '_id',
      type: 'objectId',
    },
  ],
  x: 0,
  y: 0,
});
