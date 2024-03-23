import React from 'react';
import { TableVm, RelationVm, FieldVm } from '@/core/providers';
import { GUID } from '@/core/model';

interface Props {
  tables: TableVm[];
  relations: RelationVm[];
}

export const TableRelationsAccessible: React.FC<Props> = ({
  tables,
  relations,
}) => {
  const findFieldNameAndParent = (
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

  const findTableNameById = (id: GUID): string | undefined => {
    const table = tables.find(table => table.id === id);
    return table ? table.tableName : undefined;
  };

  const buildRelationElements = (): JSX.Element[] => {
    const relationElements: { [key: string]: JSX.Element[] } = {};

    relations.forEach(relation => {
      const fromTable = tables.find(table => table.id === relation.fromTableId);
      const toTable = tables.find(table => table.id === relation.toTableId);

      if (fromTable && toTable) {
        const fromTableName = findTableNameById(relation.fromTableId);
        const toTableName = findTableNameById(relation.toTableId);

        if (fromTableName && toTableName) {
          if (!relationElements[toTableName]) {
            relationElements[toTableName] = [];
          }

          const fromField = findFieldNameAndParent(
            fromTable.fields,
            relation.fromFieldId
          );
          const toField = findFieldNameAndParent(
            toTable.fields,
            relation.toFieldId
          );

          if (fromField && toField) {
            const relationElement = (
              <li key={relation.id}>
                {toField.parentName
                  ? `${toField.fieldName} nested field of the ${toField.parentName} has a relation type ${relation.type} with the field ${fromField.fieldName} in the ${fromTableName} collection`
                  : `${toField.fieldName} field has a relation type ${relation.type} with the field ${fromField.fieldName} in the ${fromTableName} collection`}
              </li>
            );
            relationElements[toTableName].push(relationElement);
          }
        }
      }
    });

    return Object.entries(relationElements).map(([tableName, elements]) => (
      <div key={tableName}>
        <h3>Relations for Table {tableName}</h3>
        <ul>{elements}</ul>
      </div>
    ));
  };

  return <div>{buildRelationElements()}</div>;
};
