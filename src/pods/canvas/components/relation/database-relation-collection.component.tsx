import React from 'react';
import { Coords } from '@/core/model';
import { DatabaseSchemaVm, RelationVm } from '../../canvas.vm';
import DatabaseRelationshipComponent from './database-relation.component';
import {
  calculateRelationXCoordinate,
  calculateRelationYCoordinate,
} from '../../canvas.business';

interface DatabaseRelationCollectionProps {
  schema: DatabaseSchemaVm;
}

export const DatabaseRelationCollectionComponent: React.FC<
  DatabaseRelationCollectionProps
> = ({ schema }) => {
  const renderRelation = (relation: RelationVm) => {
    const fromTable = schema.tables.find(
      table => table.id === relation.fromTableId
    );
    const toTable = schema.tables.find(
      table => table.id === relation.toTableId
    );

    if (!fromTable || !toTable) {
      return null;
    }

    const YCoords = calculateRelationYCoordinate(
      relation.fromFieldId,
      relation.toFieldId,
      fromTable,
      toTable
    );
    const XCoords = calculateRelationXCoordinate(fromTable, toTable);

    const startCoords: Coords = {
      x: XCoords.xOrigin,
      y: YCoords.yOrigin,
    };

    const endCoords: Coords = {
      x: XCoords.xDestination,
      y: YCoords.yDestination,
    };

    return (
      <DatabaseRelationshipComponent
        key={`${relation.fromTableId}-${relation.toTableId}`}
        relationType={relation.type}
        startCoords={startCoords}
        endCoords={endCoords}
      />
    );
  };

  return <g>{schema.relations.map(relation => renderRelation(relation))}</g>;
};
