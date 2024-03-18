import React from 'react';
import { TableVm } from '@/core/providers';

interface Props {
  table: TableVm;
}
export const CollectionAccessible: React.FC<Props> = props => {
  const { table } = props;
  //Todo: #389 Canvas Accessible-iterate over fields(https://github.com/Lemoncode/mongo-modeler/issues/389)

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
