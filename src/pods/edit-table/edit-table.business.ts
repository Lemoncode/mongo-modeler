import { produce } from 'immer';
import { FieldVm, TableVm } from './edit-table.vm';
import { GUID } from '@/core/model';

// TODO: Add unit test support
// #75
// https://github.com/Lemoncode/mongo-modeler/issues/75

export const removeField = (table: TableVm, fieldId: GUID): TableVm => {
  return produce(table, draftTable => {
    removeFieldRecursive(draftTable.fields, fieldId);
  });
};

export const removeFieldRecursive = (
  fields: FieldVm[],
  fieldId: GUID
): void => {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].id === fieldId) {
      fields.splice(i, 1);
      return; // Exit early if the field is found and has been removed
    }
    if (fields[i].children) {
      removeFieldRecursive(fields[i].children ?? [], fieldId);
    }
  }
};
