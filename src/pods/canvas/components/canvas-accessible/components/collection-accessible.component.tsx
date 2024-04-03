import React from 'react';
import { TableVm, DatabaseSchemaVm } from '@/core/providers';
import { TableRelationsAccessible } from './table-relations-accessible.component';

interface Props {
  table: TableVm;
  canvasSchema: DatabaseSchemaVm;
}
export const CollectionAccessible: React.FC<Props> = props => {
  const { table, canvasSchema } = props;

  return (
    <>
      <h3>
        {table.tableName} collection
        <button type="button">Edit {table.tableName} collection</button>
        <button type="button">Delete {table.tableName} collection</button>
      </h3>
      <h4>Fields for {table.tableName} collection</h4>
      <ul>
        <li aria-label="structure for fields">
          <span>Name</span>
          <span>Type</span>
          <span>NN</span>
        </li>

        <li aria-label="authors field">
          <span>_id</span>
          <span>ObjectID</span>
          <span>NN</span>
        </li>

        <li aria-label="authors field">
          <span>name</span>
          <span>String</span>
        </li>

        <li aria-label="authors field">
          <span>bio</span>
          <span>String</span>
        </li>
      </ul>
      <TableRelationsAccessible table={table} canvasSchema={canvasSchema} />
    </>
  );
};
