import React from 'react';
import { TableVm, RelationVm, DatabaseSchemaVm } from '@/core/providers';
import { findFieldNameAndParent } from './table-relations-accessible.business';

interface Props {
  relation: RelationVm;
  originTable: TableVm;
  originTableRef: React.RefObject<HTMLHeadingElement>;
  canvasSchema: DatabaseSchemaVm;
}

export const TableRelationElementOrigin: React.FC<Props> = props => {
  const { relation, originTable, canvasSchema, originTableRef } = props;

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

  const scrollToTablePosition = () => {
    if (originTableRef.current) {
      originTableRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return originField && destinationField ? (
    <li>
      {destinationField.parentName
        ? `${destinationField.fieldName} nested field of the ${destinationField.parentName} has a relation type ${relation.type} with the field ${originField.fieldName} in the ${originTable.tableName} collection`
        : `${destinationField.fieldName} field has a relation type ${relation.type} with the field ${originField.fieldName} in the ${originTable.tableName} collection`}
      <button
        onClick={() => {
          scrollToTablePosition();
        }}
      >
        Go to {originTable.tableName}
      </button>
    </li>
  ) : null;
};
