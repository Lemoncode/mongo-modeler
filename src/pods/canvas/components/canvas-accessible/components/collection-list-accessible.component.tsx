import React from 'react';
import { CollectionAccessible } from './collection-accessible.component';
import { FieldVm, RelationVm, TableVm } from '@/core/providers';
import { GUID } from '@/core/model';

interface Props {
  collectionList: TableVm[];
  relationList: RelationVm[];
}

export const CollectionListAccessible: React.FC<Props> = props => {
  const { collectionList, relationList } = props;

  // Recursive function to look up the full name of the field and its parent
  const findFieldNameAndParent = (
    fields: FieldVm[],
    id: GUID
  ): { fieldName: string; parentName?: string } | undefined => {
    for (const field of fields) {
      if (field.id === id) {
        return { fieldName: field.name };
      }
      if (field.children) {
        const nestedField = findFieldNameAndParent(field.children, id);
        if (nestedField) {
          return {
            fieldName: nestedField.fieldName,
            parentName: field.name,
          };
        }
      }
    }
    return undefined;
  };

  // Function to find table name by ID
  const findTableNameById = (
    tables: TableVm[],
    id: GUID
  ): string | undefined => {
    const table = tables.find(table => table.id === id);
    return table ? table.tableName : undefined;
  };

  // Function for constructing relation elements li
  const buildRelationElements = (
    relations: RelationVm[],
    tables: TableVm[]
  ): JSX.Element[] => {
    const relationElements: JSX.Element[] = [];

    relations.forEach(relation => {
      const fromTable = tables.find(table => table.id === relation.fromTableId);

      const toTable = tables.find(table => table.id === relation.toTableId);

      if (fromTable && toTable) {
        const fromField = findFieldNameAndParent(
          fromTable.fields,
          relation.fromFieldId
        );

        const toField = findFieldNameAndParent(
          toTable.fields,
          relation.toFieldId
        );

        const toTableName = findTableNameById(tables, relation.toTableId);

        if (fromField && toField && toTableName) {
          const relationElement = (
            <li key={relation.id}>
              {toField.parentName
                ? `${toField.fieldName} nested field of the ${toField.parentName} has a relation type ${relation.type} with the field ${fromField.fieldName} in the ${toTableName} collection`
                : `${toField.fieldName} field has a relation type ${relation.type} with the field ${fromField.fieldName} in the ${toTableName} collection`}
            </li>
          );
          relationElements.push(relationElement);
        }
      }
    });

    return relationElements;
  };

  return (
    <>
      <h2>Collections</h2>

      {collectionList.map(table => (
        <CollectionAccessible table={table} />
      ))}

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
      <h4>Relations for books collection:</h4>
      <ul>{buildRelationElements(relationList, collectionList)}</ul>
    </>
  );
};
