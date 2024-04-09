import React from 'react';
import { TableVm, DatabaseSchemaVm } from '@/core/providers';
import { TableRelationElement } from './table-relations-accessible-element.component';
import { fromTableToTableRelationMapper } from './from-table-to-table-relation.mapper';

interface Props {
  table: TableVm;
  canvasSchema: DatabaseSchemaVm;
}

export const TableRelationsAccessible: React.FC<Props> = props => {
  const { table, canvasSchema } = props;

  const relationsOutComming = canvasSchema.relations;
  const relationsIncoming = canvasSchema.relations.map(relation => {
    return fromTableToTableRelationMapper(relation);
  });

  const allRelations = [...relationsOutComming, ...relationsIncoming];

  return (
    <>
      <h4>Relations for {table.tableName} collection:</h4>

      {allRelations.map((relation, index) => {
        const fromTable = canvasSchema.tables.find(
          table => table.id === relation.fromTableId
        );

        return fromTable && relation.toTableId === table.id ? (
          <React.Fragment key={index}>
            <ul>
              <TableRelationElement
                table={table}
                relation={relation}
                fromTable={fromTable}
              />
            </ul>
          </React.Fragment>
        ) : (
          <></>
        );
      })}
    </>
  );
};
