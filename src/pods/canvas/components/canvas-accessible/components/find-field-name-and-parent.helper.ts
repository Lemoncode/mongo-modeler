import { GUID } from '@/core/model';
import { FieldVm } from '@/core/providers';

// TODO: Add testing
export const findFieldNameAndParent = (
  fields: FieldVm[],
  id: GUID
): { fieldName: string; parentName?: string } | undefined => {
  for (const field of fields) {
    if (field.id === id) {
      return { fieldName: field.name };
    }
    if (field.children) {
      const nestedField = findFieldNameAndParent(field.children, id);
      if (nestedField) {
        return {
          fieldName: nestedField.fieldName,
          parentName: field.name,
        };
      }
    }
  }
  return undefined;
};
