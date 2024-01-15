import { DropdownOptionVm, PkOptionVm } from '@/common/components';
import { GUID } from '@/core/model';
import {
  DatabaseSchemaVm,
  FieldVm,
  TableVm,
} from '@/core/providers/canvas-schema';

export const mapRelationsTipeToDropdonwVm = (): DropdownOptionVm[] => [
  { id: '1', label: '1:1' },
  { id: '2', label: '1:M' },
  { id: '3', label: 'M:1' },
];

// TODO:
// #91
//https://github.com/Lemoncode/mongo-modeler/issues/91
export const mapTablesToDropdonwVm = (
  canvasSchema: DatabaseSchemaVm
): DropdownOptionVm[] =>
  canvasSchema.tables.map(
    (table): DropdownOptionVm => ({ id: table.id, label: table.tableName })
  );

const returnTablefromCanvasShema = (
  id: GUID,
  canvasSchema: DatabaseSchemaVm
): TableVm => {
  const table = canvasSchema.tables.find(table => table.id === id);
  if (!table) {
    throw Error(`Table with id ${id} does not exist`);
  }
  return table;
};

const returnOptionsFromTable = (fields: FieldVm[]): PkOptionVm[] =>
  fields.map((field): PkOptionVm => {
    if (field.children && field.children.length > 0) {
      return {
        id: field.id,
        label: field.name,
        children: returnOptionsFromTable(field.children),
      };
    }
    return { id: field.id, label: field.name };
  });

const emptyFields: FieldVm[] = [
  { id: '', name: '', type: 'string', PK: false },
];

export const mapTablesFieldsToPkOptionVm = (
  id: GUID,
  canvasSchema: DatabaseSchemaVm
): PkOptionVm[] => {
  if (!id) {
    return returnOptionsFromTable(emptyFields);
  }
  const table = returnTablefromCanvasShema(id, canvasSchema);
  const options = returnOptionsFromTable(table.fields);

  return options;
};
