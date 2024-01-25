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

interface OptionEntry {
  label: string;
  value: FieldType;
}

export const fieldTypeOptions: OptionEntry[] = [
  { label: 'Any', value: 'any' },
  { label: 'Array', value: 'array' },
  { label: 'BinData', value: 'binData' },
  { label: 'Boolean', value: 'bool' },
  { label: 'Date', value: 'date' },
  { label: 'DBPointer', value: 'dbPointer' },
  { label: 'Decimal', value: 'decimal' },
  { label: 'Double', value: 'double' },
  { label: 'Enum', value: 'enum' },
  { label: 'Int', value: 'int' },
  { label: 'Javascript', value: 'javascript' },
  { label: 'Long', value: 'long' },
  { label: 'MaxKey', value: 'maxKey' },
  { label: 'MinKey', value: 'minKey' },
  { label: 'Null', value: 'null' },
  { label: 'Object', value: 'object' },
  { label: 'ObjectId', value: 'objectId' },
  { label: 'Regex', value: 'regex' },
  { label: 'String', value: 'string' },
  { label: 'Symbol', value: 'symbol' },
  { label: 'Timestamp', value: 'timestamp' },
  { label: 'Undefined', value: 'undefined' },
];
