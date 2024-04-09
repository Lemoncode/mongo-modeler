import React from 'react';
import { TableVm, RelationVm } from '@/core/providers';
import { findFieldNameAndParent } from './find-field-name-and-parent.helper';

interface Props {
  table: TableVm;
  relation: RelationVm;
  fromTable: TableVm;
}

export const TableRelationElement: React.FC<Props> = props => {
  const { table, relation, fromTable } = props;

  const fromField = findFieldNameAndParent(
    fromTable.fields,
    relation.fromFieldId
  );
  const toField = findFieldNameAndParent(table.fields, relation.toFieldId);

  return fromField && toField ? (
    <li>
      {toField.parentName
        ? `${toField.fieldName} nested field of the ${toField.parentName} has a relation type ${relation.type} with the field ${fromField.fieldName} in the ${fromTable.tableName} collection`
        : `${toField.fieldName} field has a relation type ${relation.type} with the field ${fromField.fieldName} in the ${fromTable.tableName} collection`}
    </li>
  ) : null;
};
