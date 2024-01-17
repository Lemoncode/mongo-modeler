import { DropdownOptionVm, PkOptionVm } from '@/common/components';
import { GUID } from '@/core/model';
import {
  DatabaseSchemaVm,
  FieldVm,
  RelationType,
  RelationVm,
  TableVm,
} from '@/core/providers/canvas-schema';
import { RelationFormVm } from './edit-relation.vm';

// TODO: Test - this mapper needs to be updated when an ID relation appears.
export const mapRelationFormVmToRelaionVM = (
  values: RelationFormVm
): RelationVm => {
  return {
    type: values.type.label as RelationType,
    fromTableId: values.fromTableId.id,
    fromFieldId: values.fromFieldId.id,
    toFieldId: values.toFieldId.id,
    toTableId: values.toTableId.id,
  };
};

export const mapRelationsTipeToDropdonwVm = (): DropdownOptionVm[] => [
  { id: '1', label: '1:1' },
  { id: '2', label: '1:M' },
  { id: '3', label: 'M:1' },
];

// TODO:
// #91 Disable toolbar add relation button when there are no relations
//https://github.com/Lemoncode/mongo-modeler/issues/91

// TODO:
// #118 Add unit tests to edit relation business
//https://github.com/Lemoncode/mongo-modeler/issues/118

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
