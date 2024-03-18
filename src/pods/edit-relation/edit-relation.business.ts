import { DropdownOptionVm, PkOptionVm } from '@/common/components';
import { GUID, GenerateGUID } from '@/core/model';
import {
  DatabaseSchemaVm,
  FieldVm,
  RelationType,
  RelationVm,
  TableVm,
} from '@/core/providers/canvas-schema';
import { FormValueVm, RelationFormVm } from './edit-relation.vm';

export const mapRelationFormVmToRelationVM = (
  values: RelationFormVm,
  relationId?: GUID
): RelationVm => {
  return {
    id: relationId || GenerateGUID(),
    type: values.type.label as RelationType,
    fromTableId: values.fromTableId.id,
    fromFieldId: values.fromFieldId.id,
    toFieldId: values.toFieldId.id,
    toTableId: values.toTableId.id,
  };
};

export const mapRelationsTypeToDropdownVm = (): DropdownOptionVm[] => [
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

const mapTableToDropdownVm = (table: TableVm): DropdownOptionVm => ({
  id: table.id,
  label: table.tableName,
});

export const mapTableListToDropdownVm = (
  canvasSchema: DatabaseSchemaVm
): DropdownOptionVm[] => {
  orderTableListToDropDownVm(canvasSchema);
  return canvasSchema.tables.map(
    (table): DropdownOptionVm => mapTableToDropdownVm(table)
  );
};

const orderTableListToDropDownVm = (canvasSchema: DatabaseSchemaVm) =>
  canvasSchema.tables.sort((a, b) => a.tableName.localeCompare(b.tableName));

const returnTableFromCanvasSchema = (
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
  const table = returnTableFromCanvasSchema(id, canvasSchema);
  const options = returnOptionsFromTable(table.fields);

  return options;
};

//Form
const mapTableToFormValueVm = (table: TableVm): FormValueVm => ({
  id: table.id,
  label: table.tableName,
});

const mapFieldVmToFormValueVm = (field: FieldVm): FormValueVm => ({
  id: field.id,
  label: field.name,
});

const createFormValueFromTableId = (
  id: GUID,
  canvasSchema: DatabaseSchemaVm
): FormValueVm => {
  const findTable = returnTableFromCanvasSchema(id, canvasSchema);
  return mapTableToFormValueVm(findTable);
};

export const findFieldRecursively = (
  fields: FieldVm[],
  id: GUID
): FieldVm | undefined => {
  for (const field of fields) {
    if (field.id === id) return field;
    if (field.children) {
      const found = findFieldRecursively(field.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

const createFormValueFromFieldId = (
  tableId: GUID,
  fieldId: GUID,
  canvasSchema: DatabaseSchemaVm
): FormValueVm => {
  const findTable = returnTableFromCanvasSchema(tableId, canvasSchema);
  const findField = findFieldRecursively(findTable.fields, fieldId);

  if (!findField) {
    throw new Error(`Field with ID ${fieldId} not found`);
  }
  return mapFieldVmToFormValueVm(findField);
};

const createFormValueFromType = (type: RelationType): FormValueVm => {
  const typeOptionList = mapRelationsTypeToDropdownVm();
  const findType = typeOptionList.find(typeOption => typeOption.label === type);

  if (!findType) {
    throw Error(`Relation type ${type} has not valid value`);
  }

  //map?
  return findType as FormValueVm;
};

const findRelation = (relations: RelationVm[], id: GUID): RelationVm => {
  const relationId = relations.find(relation => relation.id === id);
  if (!relationId) {
    throw Error(`Relation for ${relationId} is missing`);
  }
  return relationId;
};

export const createInitialIdValues = (
  relationId: GUID,
  canvasSchema: DatabaseSchemaVm
): RelationFormVm => {
  const relation = findRelation(canvasSchema.relations, relationId);
  const { fromFieldId, fromTableId, toFieldId, toTableId, type } = relation;
  const fromTableIdFormValue = createFormValueFromTableId(
    fromTableId,
    canvasSchema
  );

  const toTableIdFormValue = createFormValueFromTableId(
    toTableId,
    canvasSchema
  );

  const fromFieldIdFormValue = createFormValueFromFieldId(
    fromTableId,
    fromFieldId,
    canvasSchema
  );

  const toFieldIdFormValue = createFormValueFromFieldId(
    toTableId,
    toFieldId,
    canvasSchema
  );

  const typeFormValue = createFormValueFromType(type);

  return {
    fromTableId: fromTableIdFormValue,
    toTableId: toTableIdFormValue,
    fromFieldId: fromFieldIdFormValue,
    toFieldId: toFieldIdFormValue,
    type: typeFormValue,
  };
};

export const createInitialValues = (): RelationFormVm => ({
  fromFieldId: { id: '', label: '' },
  fromTableId: { id: '', label: '' },
  toFieldId: { id: '', label: '' },
  toTableId: { id: '', label: '' },
  type: { id: '1', label: '1:1' },
});
