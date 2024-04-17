import React from 'react';
import { CollectionListAccessible, RelationListAccessible } from './components';
import { DatabaseSchemaVm, TableVm } from '@/core/providers';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  handleEditTable: (table: TableVm) => void;
  deleteSelectedItem: (tableId: string) => void;
}

export const CanvasAccessibleComponent: React.FC<Props> = props => {
  const { canvasSchema, handleEditTable, deleteSelectedItem } = props;

  return (
    <>
      <h1 id="canvas-title">Canvas</h1>
      <CollectionListAccessible
        canvasSchema={canvasSchema}
        handleEditTable={handleEditTable}
        deleteSelectedItem={deleteSelectedItem}
      />
      <RelationListAccessible canvasSchema={canvasSchema} />
    </>
  );
};
