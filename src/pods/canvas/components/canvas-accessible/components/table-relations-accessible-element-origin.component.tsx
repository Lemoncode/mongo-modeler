import React from 'react';
import { TableVm, RelationVm, DatabaseSchemaVm } from '@/core/providers';
import { findFieldNameAndParent } from './table-relations-accessible.business';

interface Props {
  relation: RelationVm;
  originTable: TableVm;
  canvasSchema: DatabaseSchemaVm;
}

export const TableRelationElementOrigin: React.FC<Props> = props => {
  const { relation, originTable, canvasSchema } = props;

  const destinationTable = canvasSchema.tables.find(
    table => table.id === relation.toTableId
  );
  // Defensive Programming
  if (!destinationTable) return <></>;

  const originField = findFieldNameAndParent(
    originTable.fields,
    relation.fromFieldId
  );

  const destinationField = findFieldNameAndParent(
    destinationTable.fields,
    relation.toFieldId
  );

  return originField && destinationField ? (
    <li>
      {originField.parentName
        ? `${originField.fieldName} nested field of the ${originField.parentName} has a relation type ${relation.type} with the field ${destinationField.fieldName} in the ${destinationTable.tableName} collection`
        : `${originField.fieldName} field has a relation type ${relation.type} with the field ${destinationField.fieldName} in the ${destinationTable.tableName} collection`}
    </li>
  ) : null;
};
