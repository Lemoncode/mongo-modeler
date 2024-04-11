import React from 'react';
import { TableVm, RelationVm, DatabaseSchemaVm } from '@/core/providers';
import { findFieldNameAndParent } from './find-field-name-and-parent.helper';

interface Props {
  relation: RelationVm;
  destinationTable: TableVm;
  canvasSchema: DatabaseSchemaVm;
}

export const TableRelationElementDestination: React.FC<Props> = props => {
  const { relation, destinationTable, canvasSchema } = props;

  const originTable = canvasSchema.tables.find(
    table => table.id === relation.fromTableId
  );
  // TODO: Review
  if (!originTable) return <></>;

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
      {destinationField.parentName
        ? `${destinationField.fieldName} nested field of the ${destinationField.parentName} has a relation type ${relation.type} with the field ${originField.fieldName} in the ${originTable.tableName} collection`
        : `${destinationField.fieldName} field has a relation type ${relation.type} with the field ${originField.fieldName} in the ${originTable.tableName} collection`}
    </li>
  ) : null;
};
