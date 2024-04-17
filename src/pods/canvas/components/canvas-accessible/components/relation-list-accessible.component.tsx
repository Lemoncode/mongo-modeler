import React from 'react';
import { RelationAccessible } from './relation-accessible.component';
import { DatabaseSchemaVm } from '@/core/providers';
import { GUID } from '@/core/model';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onEditRelation: (relationId: GUID) => void;
  deleteSelectedItem: (selectedItemId: string) => void;
}

export const RelationListAccessible: React.FC<Props> = props => {
  const { canvasSchema, onEditRelation, deleteSelectedItem } = props;
  return (
    <>
      <h2>Relations</h2>
      {canvasSchema.relations.map((relation, index) => (
        <RelationAccessible
          relation={relation}
          key={relation.id}
          index={index + 1}
          canvas={canvasSchema}
          onEditRelation={onEditRelation}
          deleteSelectedItem={deleteSelectedItem}
        />
      ))}
    </>
  );
};
