import React from 'react';
import { CollectionListAccessible, RelationListAccessible } from './components';
import { DatabaseSchemaVm } from '@/core/providers';
import { EmptyCanvasAccessible } from './components/empty-canvas-accessible.component';
import { GUID } from '@/core/model';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onAddTableModal: () => void;
  onEditRelation: (relationId: GUID) => void;
  onDeleteSelectedItem: (selectedItemId: string) => void;
}

export const CanvasAccessibleComponent: React.FC<Props> = props => {
  const {
    canvasSchema,
    onAddTableModal,
    onEditRelation,
    onDeleteSelectedItem,
  } = props;

  return (
    <>
      <h1 id="canvas-title">Canvas</h1>
      {canvasSchema.tables.length > 0 ? (
        <>
          <CollectionListAccessible canvasSchema={canvasSchema} />
          <RelationListAccessible
            canvasSchema={canvasSchema}
            onEditRelation={onEditRelation}
            onDeleteSelectedItem={onDeleteSelectedItem}
          />
        </>
      ) : (
        <EmptyCanvasAccessible onAddTableModal={onAddTableModal} />
      )}
    </>
  );
};
