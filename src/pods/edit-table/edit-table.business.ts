import { produce } from 'immer';
import { FieldVm, TableVm } from './edit-table.vm';
import { GUID } from '@/core/model';
import * as editTableVm from './edit-table.vm';

// TODO: Add unit test support
// #75
// https://github.com/Lemoncode/mongo-modeler/issues/75
export const removeField = (table: TableVm, fieldId: GUID): TableVm => {
  return produce(table, draftTable => {
    const removeFieldRecursive = (fields: FieldVm[]): void => {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].id === fieldId) {
          fields.splice(i, 1);
          return; // Exit early if the field is found and has been removed
        }
        if (fields[i].children) {
          removeFieldRecursive(fields[i].children ?? []);
        }
      }
    };

    removeFieldRecursive(draftTable.fields);
  });
};

export const addFieldLogic = (
  currentTable: TableVm,
  fieldId: GUID,
  isChildren: boolean
) => {
  return produce(currentTable, draftTable => {
    const findAndAddField = (fields: editTableVm.FieldVm[]): boolean => {
      const fieldIndex = fields.findIndex(f => f.id === fieldId);
      if (fieldIndex != -1) {
        if (isChildren) {
          fields[fieldIndex].children = fields[fieldIndex].children || [];
          fields[fieldIndex]?.children?.unshift(
            editTableVm.createDefaultField()
          );
        } else {
          fields.splice(fieldIndex + 1, 0, editTableVm.createDefaultField());
        }
        return true; // Field found and updated
      }
      // Recursively search in nested fields
      for (const field of fields) {
        if (field.children && findAndAddField(field.children)) {
          return true; // Field found and updated in nested field
        }
      }

      return false; // Field not found
    };

    findAndAddField(draftTable.fields);
  });
};
