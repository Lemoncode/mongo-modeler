import React from 'react';
import { FieldList } from './field-list-accessible.component';
import { TableVm, DatabaseSchemaVm } from '@/core/providers';
import { TableRelationsAccessible } from './table-relations-accessible.component';

interface Props {
  table: TableVm;
  canvasSchema: DatabaseSchemaVm;
  onEditTable: (table: TableVm) => void;
  onDeleteSelectedItem: (tableId: string) => void;
  collectionRefs: React.MutableRefObject<{
    [key: string]: React.RefObject<HTMLHeadingElement>;
  }>;
  isTabletOrMobileDevice: boolean;
}

export const CollectionAccessible: React.FC<Props> = props => {
  const {
    table,
    canvasSchema,
    onEditTable,
    onDeleteSelectedItem,
    collectionRefs,
    isTabletOrMobileDevice,
  } = props;

  return (
    <>
      <h3 ref={collectionRefs.current[table.id]}>
        {table.tableName} collection
      </h3>
      {!isTabletOrMobileDevice ? (
        <ul>
          <li>
            <button type="button" onClick={() => onEditTable(table)}>
              Edit {table.tableName} collection
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => onDeleteSelectedItem(table.id)}
            >
              Delete {table.tableName} collection
            </button>
          </li>
        </ul>
      ) : null}
      <h4>Fields for {table.tableName} collection</h4>
      <ul>
        <FieldList fieldList={table.fields} listName={table.tableName} />
      </ul>
      <TableRelationsAccessible
        table={table}
        canvasSchema={canvasSchema}
        collectionRefs={collectionRefs}
      />
    </>
  );
};
