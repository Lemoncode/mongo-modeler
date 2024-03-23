import React from 'react';
import { CollectionAccessible } from './collection-accessible.component';
import { RelationVm, TableVm } from '@/core/providers';

interface Props {
  collectionList: TableVm[];
  relationsList: RelationVm[];
}

export const CollectionListAccessible: React.FC<Props> = props => {
  const { collectionList, relationsList } = props;

  return (
    <>
      <h2>Collections</h2>

      <CollectionAccessible tables={collectionList} relations={relationsList} />

      {/* Code bellow only is just an example. We need do it mapping the real data
      and with TableAccessible component. IMPORTANT: we don't need divs!*/}
      <h3>
        Reviews Collection
        <button type="button">Edit reviews collection</button>
        <button type="button">Delete reviews collection</button>
      </h3>
      <h4>Fields for Reviews Table</h4>
      <ul>
        <li aria-label="structure for fields">
          <span>Name</span>
          <span>Type</span>
          <span>NN</span>
        </li>

        <li aria-label="review field">
          <span>_id</span>
          <span>objectID</span>
          <span>NN</span>
        </li>

        <li aria-label="review field">
          <span>rating</span>
          <span>int</span>
          <span></span>
        </li>

        <li aria-label="review field">
          <span>comment</span>
          <span>string</span>
          <span></span>
        </li>

        <li aria-label="review field">
          <span>book</span>
          <span>objectId</span>
          <span></span>
        </li>
      </ul>
      <h4>Relations for reviews collection:</h4>
      <ul>
        <li>
          Field "book" has a relation type "M:1" with field _id in Books
          collection <a href="#books">Go to books collection</a>
        </li>
      </ul>
      <h3>Books Collection</h3>
      <button type="button">Edit books collection</button>
      <button type="button">Delete books collection</button>
      <h4>Fields for Books Collection</h4>
      <ul>
        <li aria-label="structure for fields">
          <span>Name</span>
          <span>Type</span>
          <span>NN</span>
        </li>

        <li aria-label="books field">
          <span>_id</span>
          <span>objectID</span>
          <span>NN</span>
        </li>

        <li aria-label="books field">
          <span>ISBDN</span>
          <span>string</span>
        </li>

        <li aria-label="books field">
          <span>title</span>
          <span>string</span>
        </li>

        <li aria-label="books field">
          <span>publishDate</span>
          <span>date</span>
        </li>

        <li aria-label="books field">
          <span>authors</span>
          <span>object array</span>

          <ul>
            <li aria-label="author nested field">
              <span>_id</span>
              <span>objectId</span>
            </li>

            <li aria-label="author nested field">
              <span>name</span>
              <span>string</span>
            </li>
          </ul>
        </li>

        <li aria-label="books field">
          <span>topReviews</span>
          <span>object array</span>

          <ul>
            <li aria-label="topReviews nested field">
              <span>_id</span>
              <span>objectId</span>
            </li>

            <li aria-label="topReviews nested field">
              <span>rating</span>
              <span>int</span>
            </li>
          </ul>
        </li>

        <li aria-label="books field">
          <span>averageRating</span>
          <span>date</span>
        </li>
      </ul>
    </>
  );
};
