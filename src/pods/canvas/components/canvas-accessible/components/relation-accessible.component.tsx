import React from 'react';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers';
import {
  findFields,
  getTableNameById,
  generateRouteField,
} from './relation-accesible.bussines';

interface Props {
  relation: RelationVm;
  index: number;
  canvas: DatabaseSchemaVm;
}

export const RelationAccessible: React.FC<Props> = props => {
  const { relation, index, canvas } = props;

  const originTableName = getTableNameById(canvas.tables, relation.fromTableId);
  const originFieldsFromTable = findFields(canvas.tables, relation.fromTableId);

  const originRouteOfFields = generateRouteField(
    originFieldsFromTable,
    relation.fromFieldId,
    []
  );

  const destinationTableName = getTableNameById(
    canvas.tables,
    relation.toTableId
  );

  const destinationFieldsFromTable = findFields(
    canvas.tables,
    relation.toTableId
  );

  const destinationRouteOfFields = generateRouteField(
    destinationFieldsFromTable,
    relation.toFieldId,
    []
  );

  return (
    <>
      <h3>
        Relation {index}: {originTableName} - {originRouteOfFields} with{' '}
        {destinationTableName} - {destinationRouteOfFields}
        <button>Edit relation {index}</button>
        <button>Delete relation {index}</button>
      </h3>
    </>
  );
};
