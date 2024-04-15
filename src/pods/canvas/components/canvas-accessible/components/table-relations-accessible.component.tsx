import React from 'react';
import { TableVm, DatabaseSchemaVm, RelationVm } from '@/core/providers';
import { TableRelationElementOrigin } from './table-relations-accessible-element-origin.component';
import { TableRelationElementDestination } from './table-relations-accessible-element-destination.component';
import { getTypeOfRelationForTable } from './table-relations-accessible.business';
import { GUID } from '@/core/model';

interface Props {
  table: TableVm;
  canvasSchema: DatabaseSchemaVm;
}

export const TableRelationsAccessible: React.FC<Props> = props => {
  const { table, canvasSchema } = props;

  const displayRelationType = (tableGuid: GUID, relation: RelationVm) => {
    const typeOfRelation = getTypeOfRelationForTable(tableGuid, relation);
    switch (typeOfRelation) {
      case 'origin':
        return (
          <React.Fragment key={relation.id}>
            <TableRelationElementOrigin
              relation={relation}
              originTable={table}
              canvasSchema={canvasSchema}
            />
          </React.Fragment>
        );
      case 'destination':
        return (
          <React.Fragment key={relation.id}>
            <TableRelationElementDestination
              relation={relation}
              destinationTable={table}
              canvasSchema={canvasSchema}
            />
          </React.Fragment>
        );
      case 'none':
        return null;
    }
  };

  const tableHasRelations = canvasSchema.relations.some(
    relation =>
      relation.fromTableId === table.id || relation.toTableId === table.id
  );

  return (
    <>
      {tableHasRelations ? (
        <>
          <h4>Relations for {table.tableName} collection:</h4>
          <ul>
            {canvasSchema.relations.map(relation => {
              return displayRelationType(table.id, relation);
            })}
          </ul>
        </>
      ) : null}
    </>
  );
};
