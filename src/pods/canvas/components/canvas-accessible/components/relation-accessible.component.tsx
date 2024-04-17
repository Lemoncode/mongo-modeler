import React from 'react';
import {
  DatabaseSchemaVm,
  RelationVm,
  useCanvasSchemaContext,
  useModalDialogContext,
} from '@/core/providers';
import {
  findFields,
  getTableNameById,
  generateRouteField,
} from './relation-accesible.bussines';
import { GUID } from '@/core/model';
import { EditRelationPod } from '@/pods/edit-relation';
import { EDIT_RELATION_TITLE } from '@/common/components';

interface Props {
  relation: RelationVm;
  index: number;
  canvas: DatabaseSchemaVm;
}

export const RelationAccessible: React.FC<Props> = props => {
  const { relation, index, canvas } = props;
  const { updateFullRelation, deleteSelectedItem } = useCanvasSchemaContext();
  const { openModal, closeModal } = useModalDialogContext();

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

  const handleChangeRelation = (relation: RelationVm) => {
    updateFullRelation(relation);
    closeModal();
  };

  const handleCloseEditRelation = () => {
    closeModal();
  };

  const handleEditRelation = (relationId: GUID) => {
    openModal(
      <EditRelationPod
        onChangeRelation={handleChangeRelation}
        canvasSchema={canvas}
        relationId={relationId}
        onClose={handleCloseEditRelation}
      />,
      EDIT_RELATION_TITLE
    );
  };

  return (
    <>
      <h3>
        Relation {index}: {originTableName} - {originRouteOfFields} with{' '}
        {destinationTableName} - {destinationRouteOfFields}
        <button onClick={() => handleEditRelation(relation.id)}>
          Edit relation {index}
        </button>
        <button onClick={() => deleteSelectedItem(relation.id)}>
          Delete relation {index}
        </button>
      </h3>
    </>
  );
};
