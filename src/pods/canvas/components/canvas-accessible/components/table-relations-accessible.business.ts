import { GUID } from '@/core/model';
import { FieldVm, RelationVm } from '@/core/providers';

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

export type TypeOfRelation = 'origin' | 'destination' | 'none';
export const getTypeOfRelationForTable = (
  tableId: GUID,
  relation: RelationVm
): TypeOfRelation => {
  let typeOfRelation: TypeOfRelation = 'none';
  if (tableId === relation.fromTableId) {
    return (typeOfRelation = 'origin');
  }
  if (tableId === relation.toTableId) {
    return (typeOfRelation = 'destination');
  }
  return typeOfRelation;
};
