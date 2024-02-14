import { GUID } from '@/core/model';
import * as canvasModel from '@/core/providers/canvas-schema/canvas-schema-vlatest.model';
import * as editTableModel from './edit-table.vm';

// Return -1 if is not a FK related field, otherwise return the fieldId
// TODO: This would need further refinement:
//  1. One to One relationships may endup with two FKs? maybe we should return an array of fieldIds
//  2. We could split this method (one function per case)
const extractFieldIDThatIsFk =
  (tableId: GUID) =>
  (relation: canvasModel.RelationVm): GUID => {
    let result: GUID = '-1';
    switch (relation.type) {
      case '1:1':
        if (
          relation.fromTableId === tableId ||
          relation.toTableId === tableId
        ) {
          return relation.fromFieldId;
        }
        if (
          relation.fromTableId === tableId ||
          relation.toTableId === tableId
        ) {
          return relation.fromFieldId;
        }
        break;
      case '1:M':
        if (relation.toTableId === tableId) {
          return relation.toFieldId;
        }
        break;
      case 'M:1':
        if (relation.fromTableId === tableId) {
          return relation.fromFieldId;
        }
        break;
    }

    return result;
  };

const markFKFields = (
  fields: canvasModel.FieldVm[],
  FKFields: GUID[]
): editTableModel.FieldVm[] => {
  let result: editTableModel.FieldVm[] = [];
  fields.forEach(field => {
    const isFK = FKFields.includes(field.id);
    result.push({
      ...field,
      children: !field.children ? [] : markFKFields(field.children, FKFields),
      FK: isFK,
    });
  });

  return result;
};

// TODO: Right now we are crossing boundaries
// Accessing the canvas ViewModel table
// in the future we will promote TableVm to a core model
// and use a alias for the canvas if needed
// on the EditTable we need to keep it since we are enriching it
// with the FKs (that's something calculated from the canvas relations)
// TODO: Add unit tests supporting this mapper
// #58
//https://github.com/Lemoncode/mongo-modeler/issues/58
export const mapTableVmToEditTableVm = (
  canvasTable: canvasModel.TableVm,
  relations: canvasModel.RelationVm[]
): editTableModel.TableVm => {
  // 1. Copy the core values from the canvas table
  const editTable: editTableModel.TableVm = {
    ...canvasTable,
    fields: [],
  };

  // 2. Grab the subset of field that are related to the current table as FK
  const FKFields: GUID[] = relations.map(
    extractFieldIDThatIsFk(canvasTable.id)
  );

  // 3. Iterate recursively over the fields
  const finalFields = markFKFields(canvasTable.fields, FKFields);

  // 4. Assign the enriched fields to the editTable
  editTable.fields = finalFields;

  return editTable;
};

const mapEditTableFieldsToTableVmFields = (
  fields: editTableModel.FieldVm[]
): canvasModel.FieldVm[] => {
  let result: canvasModel.FieldVm[] = [];

  fields.forEach(field => {
    // 'FK' and 'isNewAdd' were ignored because they have a rest property sibling.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { FK, isNewAdd, ...editFieldVm } = field;
    result.push({
      ...editFieldVm,
      children: !field.children
        ? []
        : mapEditTableFieldsToTableVmFields(field.children),
    });
  });

  return result;
};

// TODO: Add Unit tests
export const mapEditTableVmToTableVm = (
  editTable: editTableModel.TableVm
): canvasModel.TableVm => {
  // 1. Copy the core values from the editTable
  const canvasTable: canvasModel.TableVm = {
    ...editTable,
    fields: [],
  };

  // 2. Iterate recursively over the fields
  // 3. Assign the enriched fields to the editTable
  canvasTable.fields = mapEditTableFieldsToTableVmFields(editTable.fields);

  return canvasTable;
};
