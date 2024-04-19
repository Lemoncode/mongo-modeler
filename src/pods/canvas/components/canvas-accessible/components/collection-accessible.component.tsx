import React from 'react';
import { FieldList } from './field-list-accessible.component';
import { TableVm, DatabaseSchemaVm } from '@/core/providers';
import { TableRelationsAccessible } from './table-relations-accessible.component';

interface Props {
  table: TableVm;
  canvasSchema: DatabaseSchemaVm;
  onEditTable: (table: TableVm) => void;
  onDeleteSelectedItem: (tableId: string) => void;
}

export const CollectionAccessible: React.FC<Props> = props => {
  const { table, canvasSchema, onEditTable, onDeleteSelectedItem } = props;

  return (
    <>
      <h3>
        {table.tableName} collection
        <button type="button" onClick={() => onEditTable(table)}>
          Edit {table.tableName} collection
        </button>
        <button type="button" onClick={() => onDeleteSelectedItem(table.id)}>
          Delete {table.tableName} collection
        </button>
      </h3>
      <h4>Fields for {table.tableName} collection</h4>
      <ul>
        <FieldList fieldList={table.fields} listName={table.tableName} />
      </ul>
      <TableRelationsAccessible table={table} canvasSchema={canvasSchema} />
    </>
  );
};
