import React from 'react';
import { CollectionListAccessible, RelationListAccessible } from './components';
import { DatabaseSchemaVm } from '@/core/providers';

interface Props {
  canvasSchema: DatabaseSchemaVm;
}

export const CanvasAccessibleComponent: React.FC<Props> = props => {
  const { canvasSchema } = props;

  return (
    <>
      <h1 id="canvas-title">Canvas</h1>
      <CollectionListAccessible collectionList={canvasSchema.tables} />
      <RelationListAccessible canvasSchema={canvasSchema} />
    </>
  );
};
