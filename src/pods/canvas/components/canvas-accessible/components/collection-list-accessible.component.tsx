import React from 'react';
import { CollectionAccessible } from './collection-accessible.component';
import { DatabaseSchemaVm } from '@/core/providers';

interface Props {
  canvasSchema: DatabaseSchemaVm;
}

export const CollectionListAccessible: React.FC<Props> = props => {
  const { canvasSchema } = props;

  return (
    <>
      <h2>Collections</h2>

      {canvasSchema.tables.map(table => (
        <CollectionAccessible
          table={table}
          canvasSchema={canvasSchema}
          key={table.id}
        />
      ))}
    </>
  );
};
