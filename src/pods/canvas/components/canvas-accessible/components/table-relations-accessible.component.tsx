import React from 'react';
import { TableVm, FieldVm, DatabaseSchemaVm } from '@/core/providers';
import { GUID } from '@/core/model';

interface Props {
  table: TableVm;
  canvasSchema: DatabaseSchemaVm;
}

export const TableRelationsAccessible: React.FC<Props> = props => {
  const { table, canvasSchema } = props;

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
    const foundTable = canvasSchema.tables.find(table => table.id === id);
    return foundTable ? foundTable.tableName : undefined;
  };

  const renderRelationElements = (): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    canvasSchema.relations.forEach(relation => {
      if (relation.toTableId === table.id) {
        const fromTable = canvasSchema.tables.find(
          table => table.id === relation.fromTableId
        );

        if (fromTable) {
          const fromTableName = findTableNameById(relation.fromTableId);

          if (fromTableName) {
            const fromField = findFieldNameAndParent(
              fromTable.fields,
              relation.fromFieldId
            );
            const toField = findFieldNameAndParent(
              table.fields,
              relation.toFieldId
            );

            if (fromField && toField) {
              elements.push(
                <li key={relation.id}>
                  {toField.parentName
                    ? `${toField.fieldName} nested field of the ${toField.parentName} has a relation type ${relation.type} with the field ${fromField.fieldName} in the ${fromTableName} collection`
                    : `${toField.fieldName} field has a relation type ${relation.type} with the field ${fromField.fieldName} in the ${fromTableName} collection`}
                </li>
              );
            }
          }
        }
      }
    });

    return elements;
  };

  return (
    <>
      {renderRelationElements().length !== 0 && (
        <>
          <h4>Relations for {table.tableName} collection:</h4>
          <ul>{renderRelationElements()}</ul>
        </>
      )}
    </>
  );
};
