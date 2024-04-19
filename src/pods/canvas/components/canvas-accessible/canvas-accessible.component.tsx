import React from 'react';
import { CollectionListAccessible, RelationListAccessible } from './components';
import { DatabaseSchemaVm } from '@/core/providers';
import { GUID } from '@/core/model';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onEditRelation: (relationId: GUID) => void;
  onDeleteSelectedItem: (selectedItemId: string) => void;
}

export const CanvasAccessibleComponent: React.FC<Props> = props => {
  const { canvasSchema, onEditRelation, onDeleteSelectedItem } = props;

  return (
    <>
      <h1 id="canvas-title">Canvas</h1>
      <CollectionListAccessible canvasSchema={canvasSchema} />
      <RelationListAccessible
        canvasSchema={canvasSchema}
        onEditRelation={onEditRelation}
        onDeleteSelectedItem={onDeleteSelectedItem}
      />
    </>
  );
};
