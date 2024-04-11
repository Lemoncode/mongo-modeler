import React from 'react';
import { TableVm, DatabaseSchemaVm } from '@/core/providers';
import { TableRelationElementOrigin } from './table-relations-accessible-element-origin.component';
import { TableRelationElementDestination } from './table-relations-accessible-element-destination.component';

interface Props {
  table: TableVm;
  canvasSchema: DatabaseSchemaVm;
}

export const TableRelationsAccessible: React.FC<Props> = props => {
  const { table, canvasSchema } = props;

  return (
    <>
      <h4>Relations for {table.tableName} collection:</h4>

      <ul>
        {canvasSchema.relations.map((relation, index) => {
          if (table.id === relation.fromTableId) {
            return (
              <React.Fragment key={index}>
                <TableRelationElementOrigin
                  relation={relation}
                  originTable={table}
                  canvasSchema={canvasSchema}
                />
              </React.Fragment>
            );
          } else if (table.id === relation.toTableId) {
            return (
              <React.Fragment key={index}>
                <TableRelationElementDestination
                  relation={relation}
                  destinationTable={table}
                  canvasSchema={canvasSchema}
                />
              </React.Fragment>
            );
          }
        })}
      </ul>
    </>
  );
};
