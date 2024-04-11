import React from 'react';
import { TableVm, RelationVm, DatabaseSchemaVm } from '@/core/providers';
import { findFieldNameAndParent } from './find-field-name-and-parent.helper';

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
  // TODO: Review
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
      {destinationField.parentName
        ? `${destinationField.fieldName} nested field of the ${destinationField.parentName} has a relation type ${relation.type} with the field ${originField.fieldName} in the ${originTable.tableName} collection`
        : `${destinationField.fieldName} field has a relation type ${relation.type} with the field ${originField.fieldName} in the ${originTable.tableName} collection`}
    </li>
  ) : null;
};
