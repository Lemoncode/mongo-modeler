import React from 'react';
import { CollectionListAccessible, RelationListAccessible } from './components';
import { DatabaseSchemaVm, TableVm } from '@/core/providers';
import { EmptyCanvasAccessible } from './components/empty-canvas-accessible.component';
import { GUID } from '@/core/model';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onEditTable: (table: TableVm) => void;
  onAddTableModal: () => void;
  onEditRelation: (relationId: GUID) => void;
  onDeleteSelectedItem: (tableId: string) => void;
}

export const CanvasAccessibleComponent: React.FC<Props> = props => {
  const {
    canvasSchema,
    onEditTable,
    onAddTableModal,
    onEditRelation,
    onDeleteSelectedItem,
  } = props;

  return (
    <>
      <h1 id="canvas-title">Canvas</h1>
      {canvasSchema.tables.length > 0 ? (
        <>
          <CollectionListAccessible
            canvasSchema={canvasSchema}
            onEditTable={onEditTable}
            onDeleteSelectedItem={onDeleteSelectedItem}
          />
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
