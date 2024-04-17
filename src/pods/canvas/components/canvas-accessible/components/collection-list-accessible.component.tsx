import React from 'react';
import { CollectionAccessible } from './collection-accessible.component';
import { DatabaseSchemaVm, TableVm } from '@/core/providers';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  handleEditTable: (table: TableVm) => void;
  deleteSelectedItem: (tableId: string) => void;
}

export const CollectionListAccessible: React.FC<Props> = props => {
  const { canvasSchema, handleEditTable, deleteSelectedItem } = props;

  return (
    <>
      <h2>Collections</h2>

      {canvasSchema.tables.map(table => (
        <CollectionAccessible
          table={table}
          canvasSchema={canvasSchema}
          key={table.id}
          handleEditTable={handleEditTable}
          deleteSelectedItem={deleteSelectedItem}
        />
      ))}
    </>
  );
};
