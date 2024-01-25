// As a second step, enclose fieldToUpdate, Key and Value in an interface
// just to have only two parameters instead of four

import { produce } from 'immer';
import * as editTableVm from './edit-table.vm';

export interface UpdateFieldValueParams<K extends keyof editTableVm.FieldVm> {
  fieldToUpdate: editTableVm.FieldVm;
  key: K;
  value: editTableVm.FieldVm[K];
}

export const updateFieldValueLogic = <K extends keyof editTableVm.FieldVm>(
  table: editTableVm.TableVm,
  params: UpdateFieldValueParams<K>
) => {
  // TODO: Extract this into a business method and add unit test support
  // #61 https://github.com/Lemoncode/mongo-modeler/issues/61

  produce(table, draftTable => {
    // Find and update the field by it's id
    const findAndUpdateField = (fields: editTableVm.FieldVm[]): boolean => {
      const formerField = fields.find(f => f.id === params.fieldToUpdate.id);
      if (formerField) {
        formerField[params.key] = params.value;
        return true; // Field found and updated
      }
      // Recursively search in nested fields
      for (const field of fields) {
        if (field.children && findAndUpdateField(field.children)) {
          return true; // Field found and updated in nested field
        }
      }

      return false; // Field not found
    };

    findAndUpdateField(draftTable.fields);
  });
};
