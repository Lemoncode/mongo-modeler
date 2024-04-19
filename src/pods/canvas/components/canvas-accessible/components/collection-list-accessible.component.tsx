import React from 'react';
import { CollectionAccessible } from './collection-accessible.component';
import { DatabaseSchemaVm, TableVm } from '@/core/providers';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onEditTable: (table: TableVm) => void;
  onDeleteSelectedItem: (tableId: string) => void;
}

export const CollectionListAccessible: React.FC<Props> = props => {
  const { canvasSchema, onEditTable, onDeleteSelectedItem } = props;

  return (
    <>
      <h2>Collections</h2>

      {canvasSchema.tables.map(table => (
        <CollectionAccessible
          table={table}
          canvasSchema={canvasSchema}
          key={table.id}
          onEditTable={onEditTable}
          onDeleteSelectedItem={onDeleteSelectedItem}
        />
      ))}
    </>
  );
};
