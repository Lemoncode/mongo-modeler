import { produce } from 'immer';
import { FieldVm, TableVm } from './edit-table.vm';
import { GUID } from '@/core/model';
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

  return produce(table, draftTable => {
    // Find and update the field by it's id
    const findAndUpdateField = (fields: editTableVm.FieldVm[]): boolean => {
      const formerField = fields.find(f => f.id === params.fieldToUpdate.id);
      if (formerField) {
        if (
          params.key === 'type' &&
          formerField[params.key] === 'object' &&
          params.value !== 'object'
        ) {
          formerField.children = undefined;
        }
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

export const calculateDBColumnsWidth = (
  percentages: number[],
  totalPixelWidth: number
): number[] => {
  const columnWidths = percentages.map(
    percentages => (percentages * totalPixelWidth) / 100
  );
  return columnWidths;
};

export const moveDownField = (table: TableVm, fieldId: GUID): TableVm => {
  return produce(table, draftTable => {
    const moveDownFieldRecursive = (fields: FieldVm[]): void => {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field.id === fieldId && i < fields.length - 1) {
          const temp = fields[i];
          fields[i] = fields[i + 1];
          fields[i + 1] = temp;
          return;
        }
        if (field.children && field.children.length > 0) {
          moveDownFieldRecursive(field.children);
        }
      }
    };

    moveDownFieldRecursive(draftTable.fields);
  });
};

export const moveUpField = (table: TableVm, fieldId: GUID): TableVm => {
  return produce(table, draftTable => {
    const moveUpFieldRecursive = (fields: FieldVm[]): void => {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field.id === fieldId && i > 0) {
          const temp = fields[i];
          fields[i] = fields[i - 1];
          fields[i - 1] = temp;
          return;
        }
        if (field.children && field.children.length > 0) {
          moveUpFieldRecursive(field.children);
        }
      }
    };

    moveUpFieldRecursive(draftTable.fields);
  });
};
