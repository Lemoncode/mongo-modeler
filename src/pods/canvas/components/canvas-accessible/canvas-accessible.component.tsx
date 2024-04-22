import React from 'react';
import { CollectionListAccessible, RelationListAccessible } from './components';
import { DatabaseSchemaVm, TableVm } from '@/core/providers';
import { GUID } from '@/core/model';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onEditTable: (table: TableVm) => void;
  onEditRelation: (relationId: GUID) => void;
  onDeleteSelectedItem: (tableId: string) => void;
}

export const CanvasAccessibleComponent: React.FC<Props> = props => {
  const { canvasSchema, onEditTable, onEditRelation, onDeleteSelectedItem } =
    props;

  return (
    <>
      <h1 id="canvas-title">Canvas</h1>
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
  );
};
