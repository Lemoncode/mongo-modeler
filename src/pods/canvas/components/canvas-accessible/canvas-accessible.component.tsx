import React from 'react';
import { CollectionListAccessible, RelationListAccessible } from './components';
import { DatabaseSchemaVm } from '@/core/providers';
import { EmptyCanvasAccessible } from './components/empty-canvas-accessible.component';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onAddTableModal: () => void;
}

export const CanvasAccessibleComponent: React.FC<Props> = props => {
  const { canvasSchema, onAddTableModal } = props;

  return (
    <>
      <h1 id="canvas-title">Canvas</h1>
      {canvasSchema.tables.length > 0 ? (
        <>
          <CollectionListAccessible canvasSchema={canvasSchema} />
          <RelationListAccessible canvasSchema={canvasSchema} />
        </>
      ) : (
        <EmptyCanvasAccessible onAddTableModal={onAddTableModal} />
      )}
    </>
  );
};
