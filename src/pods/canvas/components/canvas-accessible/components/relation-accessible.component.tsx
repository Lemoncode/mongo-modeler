import React from 'react';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers';
import {
  findFields,
  getTableNameById,
  generateRouteField,
} from './relation-accesible.bussines';
import { GUID } from '@/core/model';

interface Props {
  relation: RelationVm;
  index: number;
  canvas: DatabaseSchemaVm;
  onEditRelation: (relationId: GUID) => void;
  onDeleteSelectedItem: (selectedItemId: string) => void;
}

export const RelationAccessible: React.FC<Props> = props => {
  const { relation, index, canvas, onEditRelation, onDeleteSelectedItem } =
    props;

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
        <button onClick={() => onEditRelation(relation.id)}>
          Edit relation {index}
        </button>
        <button onClick={() => onDeleteSelectedItem(relation.id)}>
          Delete relation {index}
        </button>
      </h3>
    </>
  );
};
