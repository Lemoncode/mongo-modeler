import React from 'react';
import { TableVm } from '@/core/providers';
import { FieldList } from './field-list-accessible.component';

interface Props {
  table: TableVm;
}

export const CollectionAccessible: React.FC<Props> = props => {
  const { table } = props;

  return (
    <>
      <h3>
        {table.tableName} collection
        <button type="button">Edit {table.tableName} collection</button>
        <button type="button">Delete {table.tableName} collection</button>
      </h3>
      <h4>Fields for {table.tableName} collection</h4>
      <ul>
        <FieldList fieldList={table.fields} listName={table.tableName} />
      </ul>
      <h4>Relations for {table.tableName} collection:</h4>
      <ul>
        <li>
          The "_id" field has a "1:M" relation with the "_id" field nested in
          the author field of the book collection
          <a href="#books">Go to books collection</a>
        </li>
      </ul>
    </>
  );
};
