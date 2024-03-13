import React from 'react';
import { TableVm } from '@/core/providers';

interface Props {
  table: TableVm;
}
export const CollectionAccessible: React.FC<Props> = props => {
  //Todo: #388 Canvas Accessible-collection(https://github.com/Lemoncode/mongo-modeler/issues/388)
  //Todo: #389 Canvas Accessible-iterate over fields(https://github.com/Lemoncode/mongo-modeler/issues/389)
  console.log(props.table);

  return (
    <>
      <h3>
        Authors collection
        <button type="button">Edit authors collection</button>
        <button type="button">Delete authors collection</button>
      </h3>
      <h4>Fields for Authors collection</h4>
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
      <h4>Relations for author collection:</h4>
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
