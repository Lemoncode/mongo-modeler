import { GUID } from '@/core/model';
import { FieldVm, TableVm } from '@/core/providers';

export const generateRouteField = (
  fields: FieldVm[],
  fieldId: GUID,
  routes: string[]
): string | undefined => {
  for (const field of fields) {
    const routeTree = [...routes, field.name];

    if (field.id === fieldId) {
      return routeTree.join(' - ');
    }
    if (field.children) {
      const findFieldName = generateRouteField(
        field.children,
        fieldId,
        routeTree
      );
      if (findFieldName) {
        return findFieldName;
      }
    }
  }
  return undefined;
};

export const findFields = (tables: TableVm[], id: GUID) => {
  const table = tables.find(table => table.id === id);
  if (table) {
    return table.fields;
  }
  return undefined;
};

export const findNameFromTheTable = (tables: TableVm[], id: GUID) => {
  const foundTableName = tables.find(table => table.id === id);
  if (foundTableName) {
    return foundTableName.tableName;
  }
  return undefined;
};
